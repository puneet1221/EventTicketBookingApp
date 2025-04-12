// Import necessary libraries and packages
package com.moments_app.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.PaymentExecution;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

@Service
public class PaymentService {

	@Autowired
	private APIContext apiContext;

	// Method to create a PayPal payment
	public Payment createPayment(Double total, String currency, String method, String intent, String description,
			String cancelUrl, String successUrl) throws PayPalRESTException {
		// Create an Amount object to define the payment's currency and total amount
		Amount amount = new Amount();
		amount.setCurrency(currency); // Set the currency (e.g., "USD", "EUR")
		// Format the total amount to two decimal places as a string
		amount.setTotal(String.format(Locale.forLanguageTag(currency), "%.2f", total));

		// Create a Transaction object to represent this payment's details
		Transaction transaction = new Transaction();
		transaction.setAmount(amount); // Associate the amount object with the transaction
		transaction.setDescription(description); // Add a description for the transaction

		// Add the transaction to a list, as PayPal expects transactions in a list
		// format
		List<Transaction> transactions = new ArrayList<>();
		transactions.add(transaction); // Add the transaction to the list

		// Define the Payer object, specifying the payment method
		Payer payer = new Payer();
		payer.setPaymentMethod(method); // Set the payment method (e.g., "paypal")

		// Create a Payment object to represent the overall payment process
		Payment payment = new Payment();
		payment.setTransactions(transactions); // Attach the list of transactions
		payment.setIntent(intent); // Set the payment intent (e.g., "sale" or "authorize")
		payment.setPayer(payer); // Associate the payer details

		// Define redirect URLs for successful and canceled payments
		RedirectUrls redirectUrls = new RedirectUrls();
		redirectUrls.setCancelUrl(cancelUrl); // Set the URL for payment cancellation
		redirectUrls.setReturnUrl(successUrl); // Set the URL for payment approval
		payment.setRedirectUrls(redirectUrls); // Attach redirect URLs to the payment

		// Create the payment on PayPal's server using the API context
		// The apiContext contains authentication credentials and API environment
		// details
		return payment.create(apiContext);

		// Return the Payment object, which contains details like approval URL and
		// payment ID
		
	}

	/**
	 * Executes an approved PayPal payment.
	 * 
	 * @param paymentId The ID of the payment to execute (received from PayPal after
	 *                  payment creation).
	 * @param payerId   The ID of the payer (received from PayPal after the user
	 *                  approves the payment).
	 * @return A Payment object containing the details of the executed payment.
	 * @throws PayPalRESTException If there is an error during the execution of the
	 *                             payment.
	 */
	public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
		// Create a new Payment object to represent the payment being executed
		Payment payment = new Payment();
		payment.setId(paymentId); // Set the ID of the payment to execute

		// Create a PaymentExecution object to specify the payer details
		PaymentExecution pexecution = new PaymentExecution();
		pexecution.setPayerId(payerId); // Set the ID of the payer (provided by PayPal)
		// Execute the payment using the API context and payment execution details
		// This sends a request to PayPal to finalize the payment after approval
		return payment.execute(apiContext, pexecution);
	}

}
