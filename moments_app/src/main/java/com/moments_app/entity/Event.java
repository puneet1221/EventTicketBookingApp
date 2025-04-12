package com.moments_app.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.moments_app.dto.AddEventDTO;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

@Entity
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private LocalDateTime dateTime;
	private Boolean isOpen;
	private Integer ticketCost;
	private Integer totalTickets;
	private Integer availableTickets;
	private String genre;
	private String bannerUrl;
	@Lob
	private String about;
	@ElementCollection
	@Cascade(CascadeType.ALL)
	private List<String> termsAndConditions;

	private String duration;

	@ElementCollection
	@Cascade(CascadeType.ALL)
	private List<String> whatToExpect;

	@ElementCollection
	@Cascade(CascadeType.ALL)
	private List<String> gallery;

	@ElementCollection
	@Cascade(CascadeType.ALL)
	private List<String> languages;
	private String suitableFor;
	@Embedded
	private Address address;

	public Event() {
		super();
	}
	public Event(AddEventDTO addEventDTO) {
		this.about = addEventDTO.getName();
		Address address = new Address();
		address.setCity(addEventDTO.getCity());
		address.setLandMark(addEventDTO.getLandMark());
		address.setPincode(addEventDTO.getPincode());
		address.setVenue(addEventDTO.getVenue());
		this.setAddress(address);
		this.setName(addEventDTO.getName());
		this.setGenre(addEventDTO.getGenre());
		this.setAvailableTickets(addEventDTO.getTotalTickets());
		this.setTicketCost(addEventDTO.getTicketCost());
		this.setTotalTickets(addEventDTO.getTotalTickets());
		this.setSuitableFor(addEventDTO.getSuitableFor());
		this.setLanguages(addEventDTO.getLanguages());
		this.setTermsAndConditions(addEventDTO.getTermsAndConditions());
		this.setLanguages(addEventDTO.getLanguages());
		this.setAbout(addEventDTO.getAbout());
		this.setDuration(addEventDTO.getDuration());
		this.setWhatToExpect(addEventDTO.getWhatToExpect());
		this.setDateTime(addEventDTO.getDateTime());
		this.setIsOpen(addEventDTO.isOpen());

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	public Boolean getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(Boolean isOpen) {
		this.isOpen = isOpen;
	}

	public Integer getTicketCost() {
		return ticketCost;
	}

	public void setTicketCost(Integer ticketCost) {
		this.ticketCost = ticketCost;
	}

	public Integer getTotalTickets() {
		return totalTickets;
	}

	public void setTotalTickets(Integer totalTickets) {
		this.totalTickets = totalTickets;
	}

	public Integer getAvailableTickets() {
		return availableTickets;
	}

	public void setAvailableTickets(Integer availableTickets) {
		this.availableTickets = availableTickets;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getBannerUrl() {
		return bannerUrl;
	}

	public void setBannerUrl(String bannerUrl) {
		this.bannerUrl = bannerUrl;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public List<String> getTermsAndConditions() {
		return termsAndConditions;
	}

	public void setTermsAndConditions(List<String> termsAndConditions) {
		this.termsAndConditions = termsAndConditions;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public List<String> getGallery() {
		return gallery;
	}

	public void setGallery(List<String> gallery) {
		this.gallery = gallery;
	}

	public List<String> getLanguages() {
		return languages;
	}

	public void setLanguages(List<String> languages) {
		this.languages = languages;
	}

	public String getSuitableFor() {
		return suitableFor;
	}

	public void setSuitableFor(String suitableFor) {
		this.suitableFor = suitableFor;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public List<String> getWhatToExpect() {
		return whatToExpect;
	}

	public void setWhatToExpect(List<String> whatToExpect) {
		this.whatToExpect = whatToExpect;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}

@Embeddable
@Data
class Address {
	private String city;
	private String pincode;
	private String venue;
	private String landMark;

	public Address() {
		super();

	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getVenue() {
		return venue;
	}

	public void setVenue(String venue) {
		this.venue = venue;
	}

	public String getLandMark() {
		return landMark;
	}

	public void setLandMark(String landMark) {
		this.landMark = landMark;
	}

	@Override
	public String toString() {
		return "Address [city=" + city + ", pincode=" + pincode + ", venue=" + venue + ", landMark=" + landMark
				+ ", toString()=" + super.toString() + "]";
	}

}
