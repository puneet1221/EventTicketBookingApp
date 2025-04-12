package com.moments_app.services;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moments_app.dto.BookingDetailsDTO;
import com.moments_app.dto.PaymentRequestDTO;
import com.moments_app.entity.CartItem;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

@RestController
public class PayPalController {
	// stores booking details of user temporariy unti payment is confirmed
	Map<String, CartItem> bookingDetailsMap = new HashMap<>();
	// Autowired PaymentService to handle business logic related to payments
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private TicketService ticketService;

	private Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * Endpoint to create a PayPal payment.
	 * 
	 * @param paymentRequest An object containing payment details such as amount,
	 *                       currency, method, and description.
	 * @return The approval URL from PayPal, which the user needs to visit to
	 *         approve the payment.
	 */
	@PostMapping("/user/create-payment")
	public ResponseEntity<?> postMethodName(@RequestBody PaymentRequestDTO paymentRequest) {
		// URLs to handle success and cancellation scenarios
		String cancelUrl = "http://localhost:8080/user/payment-cancelled";
		String successUrl = "http://localhost:8080/user/payment-success?username=" + paymentRequest.getUsername();
		bookingDetailsMap.put(paymentRequest.getUsername(), paymentRequest.getBookingDetails());
		try {
			Payment payment = paymentService.createPayment(paymentRequest.getAmount(), paymentRequest.getCurrency(),
					paymentRequest.getMethod(), "sale", paymentRequest.getDescription(), cancelUrl, successUrl);
			// Loop through the links provided by PayPal in the response
			for (Links links : payment.getLinks()) {
				if (links.getRel().equals("approval_url")) {
					return new ResponseEntity<>(links.getHref(), HttpStatus.OK);
				}
			}
		} catch (PayPalRESTException exception) {
			exception.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@PreAuthorize("permitAll()")
	@GetMapping("user/payment-success")
	public ResponseEntity<?> getMethodName(@RequestParam String paymentId, @RequestParam("PayerID") String payerId,
			@RequestParam String username) {

		logger.warn("testing-->/user/payment-success");
		try {
			Payment payment = paymentService.executePayment(paymentId, payerId);
			if (payment.getState().equals("approved")) {
				ticketService.sendTicketByEmail(new BookingDetailsDTO(username, bookingDetailsMap.get(username)));
				String paymentSuccessURL = "http://localhost:5173/payment-success?paymentId="+paymentId;
				return ResponseEntity.status(HttpStatus.FOUND).header("Location", paymentSuccessURL).build();
			} else {
				return new ResponseEntity<>("an error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception ex) {
			System.err.print(ex);
			return new ResponseEntity<>("an error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	 @PreAuthorize("permitAll()")
	@GetMapping("/user/payment-cancelled")
	public ResponseEntity<?> handleCancelledPayment() {
		String paymentCancelledURL = "http://localhost:5173/payment-cancelled";
		return ResponseEntity.status(HttpStatus.FOUND).header("Location", paymentCancelledURL).build();
	}
}


