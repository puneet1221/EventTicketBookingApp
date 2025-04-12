package com.moments_app.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "event_id", foreignKey = @ForeignKey(name = "item_event_fk"), referencedColumnName = "id")
	private Event event;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "cart_id", foreignKey = @ForeignKey(name = "items_cart_fk"), referencedColumnName = "id")
	private Cart cart;

	private Integer quantity;

	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(name = "cart_item_guest_details", joinColumns = @JoinColumn(name = "cartItemId", referencedColumnName = "id", foreignKey = @ForeignKey(name = "cart_item_guest_details_cartItem_fk")), inverseJoinColumns = @JoinColumn(name = "guestDetailsId", foreignKey = @ForeignKey(name = "cart_item_guest_details_guest_fk"), referencedColumnName = "id"))
	List<GuestDetails> guestList = new ArrayList<>();

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public List<GuestDetails> getGuestList() {
		return guestList;
	}

	public void setGuestList(List<GuestDetails> guestList) {
		this.guestList = guestList;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "CartItem [id=" + id + ", event=" + event + ", cart=" + cart + ", quantity=" + quantity + ", guestList="
				+ guestList + ", getEvent()=" + getEvent() + ", getQuantity()=" + getQuantity() + ", getCart()="
				+ getCart() + ", getGuestList()=" + getGuestList() + ", getId()=" + getId() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}

}
