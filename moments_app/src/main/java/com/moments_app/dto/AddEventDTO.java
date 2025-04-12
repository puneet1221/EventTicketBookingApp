package com.moments_app.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class AddEventDTO {
	private String name;
	private LocalDateTime dateTime;
	private boolean isOpen=true;
	private Integer totalTickets;
	private Integer ticketCost;
	private String genre;
	private String about;
	private String duration;
	private List<String> termsAndConditions;
	private List<String> whatToExpect;
	private List<String> languages;
	private String suitableFor;
	private String city;
	private String pincode;
	private String venue;
	private String landMark;
	private MultipartFile banner;
	private List<MultipartFile> gallery;
	
	public Integer getTicketCost() {
		return ticketCost;
	}
	public void setTicketCost(Integer ticketCost) {
		this.ticketCost = ticketCost;
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
	public boolean isOpen() {
		return isOpen;
	}
	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}
	public Integer getTotalTickets() {
		return totalTickets;
	}
	public void setTotalTickets(Integer totalTickets) {
		this.totalTickets = totalTickets;
	}

	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public String getAbout() {
		return about;
	}
	public void setAbout(String about) {
		this.about = about;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public List<String> getTermsAndConditions() {
		return termsAndConditions;
	}
	public void setTermsAndConditions(List<String> termsAndConditions) {
		this.termsAndConditions = termsAndConditions;
	}
	public List<String> getWhatToExpect() {
		return whatToExpect;
	}
	public void setWhatToExpect(List<String> whatToExpect) {
		this.whatToExpect = whatToExpect;
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
	public MultipartFile getBanner() {
		return banner;
	}
	public void setBanner(MultipartFile banner) {
		this.banner = banner;
	}
	public List<MultipartFile> getGallery() {
		return gallery;
	}
	public void setGallery(List<MultipartFile> gallery) {
		this.gallery = gallery;
	}
	public AddEventDTO() {
		super();
	}
	
}
