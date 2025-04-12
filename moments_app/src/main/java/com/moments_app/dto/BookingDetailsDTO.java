package com.moments_app.dto;

import com.moments_app.entity.CartItem;

public class BookingDetailsDTO {

	private String username;
	private CartItem cartItem;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public CartItem getCartItem() {
		return cartItem;
	}

	public void setCartItem(CartItem cartItem) {
		this.cartItem = cartItem;
	}

	public BookingDetailsDTO(String username, CartItem cartItem) {
		super();
		this.username = username;
		this.cartItem = cartItem;
	}

}
