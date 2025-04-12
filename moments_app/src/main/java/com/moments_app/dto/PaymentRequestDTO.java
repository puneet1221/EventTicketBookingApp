package com.moments_app.dto;

import com.moments_app.entity.CartItem;


//this will helpful in payment+bookingTicket
public class PaymentRequestDTO {
	private String method;
	private double amount;
	private String currency;
	private String description;
	private CartItem bookingDetails;
	private String username;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public CartItem getBookingDetails() {
		return bookingDetails;
	}

	public void setBookingDetails(CartItem bookingDetails) {
		this.bookingDetails = bookingDetails;
	}

	// Constructor
	public PaymentRequestDTO(String method, double amount, String currency, String description) {
		this.method = method;
		this.amount = amount;
		this.currency = currency;
		this.description = description;
	}

	// Default constructor for deserialization
	public PaymentRequestDTO() {
	}

	// Getters and setters
	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
