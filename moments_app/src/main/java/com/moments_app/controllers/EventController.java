package com.moments_app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moments_app.entity.Event;
import com.moments_app.repo.EventRepo;

@RequestMapping("/moments/")
@RestController
public class EventController {

	@Autowired
	private EventRepo eventRepo;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("event")
	public ResponseEntity<?> handleAddEvent(@RequestBody Event event) {
		eventRepo.save(event);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PostMapping("add-all-events")
	public ResponseEntity<?> handleAddAllEvent(@RequestBody List<Event> events) {
		eventRepo.saveAll(events);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@GetMapping("get-eventslist")
	public List<Event> handlegetEventsList(@RequestParam String city) {
		return eventRepo.findAllByAddress_City(city);
	}

	@GetMapping("all-events")
	public ResponseEntity<?> handleGetAllEvents() {
		return new ResponseEntity<>(eventRepo.findAll(), HttpStatus.OK);
	}

	@GetMapping("/events")
	public List<Event> getMethodName(@RequestParam("genre") String genre, @RequestParam("city") String city) {
		return eventRepo.findByGenreAndAddress_City(genre,city);
	}

}
