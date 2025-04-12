package com.moments_app.entity;

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
import lombok.Data;

@Entity
@Data
public class EventTicket {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@ManyToOne
	@JoinColumn(foreignKey = @ForeignKey(name = "event_event_ticket_fk"), referencedColumnName = "id", name = "event_id")
	private Event event;

	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(joinColumns = @JoinColumn(name = "ticket_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "guest_id", referencedColumnName = "id"))
	List<GuestDetails> guestList;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "event_ticket_user_fk"), referencedColumnName = "id")
	private User user;

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public User getUser() {
		return user;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<GuestDetails> getGuestList() {
		return guestList;
	}

	public void setGuestList(List<GuestDetails> guestList) {
		this.guestList = guestList;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public EventTicket(Event event, List<GuestDetails> guestList, User user) {
		super();
		this.event = event;
		this.guestList = guestList;
		this.user = user;
	}

	public EventTicket() {
		super();
		// TODO Auto-generated constructor stub
	}

}
