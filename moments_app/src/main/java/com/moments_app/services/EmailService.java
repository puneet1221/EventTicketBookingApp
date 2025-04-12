package com.moments_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender javaMailSender;

	/**
	 * Sends an HTML email with the option to attach a file.
	 *
	 * @param to          The recipient's email address.
	 * @param subject     The subject of the email.
	 * @param htmlContent The HTML content of the email.
	 * @throws Exception If email sending fails.
	 */
	public void sendTicketHtml(String to, String subject, String htmlContent) throws Exception {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);

		// Set recipient, subject, and HTML content
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(htmlContent, true);

		// Send the email
		javaMailSender.send(message);
	}
}
