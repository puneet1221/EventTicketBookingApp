package com.moments_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.moments_app.dto.BookingDetailsDTO;
import com.moments_app.entity.EventTicket;
import com.moments_app.entity.User;
import com.moments_app.repo.TicketRepo;
import com.moments_app.repo.UserRepo;

import jakarta.transaction.Transactional;

@Service
public class TicketService {
	@Autowired
	private TemplateEngine templateEngine;
	@Autowired
	private EmailService emailService;
	@Autowired
	private TicketRepo ticketRepo;
	@Autowired
	private UserRepo userRepo;
	/**
	 * Generates HTML content for a ticket using a Thymeleaf template.
	 *
	 * @param eventTicket The event ticket details.
	 * @return The rendered HTML content.
	 */
	public String generateTicketHtml(EventTicket eventTicket) {
		// Create a context and set the eventTicket object directly
		Context context = new Context();
		context.setVariable("bookingDetails", eventTicket);
		return templateEngine.process("ticket", context);
	}

	/**
	 * Sends the ticket to the user's email.
	 *
	 * @param eventTicket The event ticket details.
	 * @throws Exception If email sending fails.
	 */

	@Transactional
	public void sendTicketByEmail(BookingDetailsDTO bookingDetails) {
		try {

			// Fetch the user
			User u = userRepo.findByUsername(bookingDetails.getUsername()).get();

			System.out.println("cart-size" + u.getCart().getItemsList().size());

			// Remove the cart item as it is now booked
			if (bookingDetails.getCartItem().getId() != null) {
				u.getCart().getItemsList()
						.removeIf(cartItem -> cartItem.getId().equals(bookingDetails.getCartItem().getId()));
			}

			System.out.println("cart-size" + u.getCart().getItemsList().size());
			// Creating EventTicket
			EventTicket eventTicket = new EventTicket(bookingDetails.getCartItem().getEvent(),
					bookingDetails.getCartItem().getGuestList(), u);
			EventTicket ticket = ticketRepo.save(eventTicket); // Save the event ticket

			// Add the ticket to the user's booked tickets list
			u.getBookedEventsTickets().add(ticket);

			// Save the user with updated booked tickets
			userRepo.save(u);

			// Generate ticket HTML and send via email
			String htmlContent = generateTicketHtml(ticket);
			String recipientEmail = bookingDetails.getUsername();
			String subject = "Your Event Ticket";
			emailService.sendTicketHtml(recipientEmail, subject, htmlContent);
			System.out.println("sucessfully send");

		} catch (Exception e) {
			// Log the error and throw a runtime exception
			System.err.println("Exception occurred: " + e.getMessage());
			throw new RuntimeException("Booking failed: " + e.getMessage());
		}
	}
}
