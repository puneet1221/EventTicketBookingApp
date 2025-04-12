package com.moments_app.controllers;

import java.io.ByteArrayOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.xhtmlrenderer.pdf.ITextRenderer; // Correct import for Flying Saucer

import com.moments_app.entity.EventTicket;
import com.moments_app.repo.TicketRepo;
import com.moments_app.services.TicketService;

@RestController
public class TicketController {

	@Autowired
	private TicketRepo ticketRepo;

	@Autowired
	private TicketService ticketService;

	@PreAuthorize("permitAll()") // Allows public access to the download
	@GetMapping("/event/{ticketId}/ticket-download")
	public ResponseEntity<?> handleTicketDownload(@PathVariable String ticketId) {
		// Fetching the event ticket using ticketId
		EventTicket eventTicket = ticketRepo.findById(ticketId)
				.orElseThrow(() -> new RuntimeException("Ticket not found with given ID"));

		try {
			// Generate the ticket HTML from the service
			String ticketHTML = ticketService.generateTicketHtml(eventTicket);

			// Initialize Flying Saucer PDF renderer
			ITextRenderer renderer = new ITextRenderer();
			renderer.setDocumentFromString(ticketHTML);
			renderer.layout();

			// Convert the generated PDF to byte array
			ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
			renderer.createPDF(byteArrayOutputStream);
			byte[] pdfBytes = byteArrayOutputStream.toByteArray();

			// Set headers for file download
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Disposition", "attachment; filename=ticket.pdf"); // Forces download
			headers.add("Content-Type", "application/pdf"); // Explicitly set PDF MIME type

			// Return the PDF as the response entity with appropriate headers and HTTP
			// status
			return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			// Handle error and return a response with error message
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating PDF");
		}
	}
}
