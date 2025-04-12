package com.moments_app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moments_app.dto.AddEventDTO;
import com.moments_app.dto.UserDTO;
import com.moments_app.entity.Event;
import com.moments_app.entity.Role;
import com.moments_app.entity.User;
import com.moments_app.repo.EventRepo;
import com.moments_app.repo.UserRepo;
import com.moments_app.services.ImgurService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/admin/")
public class AdminController {
	@Autowired
	private ImgurService imgurService;
	@Autowired
	private EventRepo eventRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Transactional
	@PostMapping("/add-event")
	public ResponseEntity<?> addEvent(@ModelAttribute AddEventDTO addEventDTO) {
		Event event = new Event(addEventDTO);
		String bannerURL = null;
		List<String> gallery = null;
		try {
			bannerURL = imgurService.uploadImage(addEventDTO.getBanner());
			gallery = imgurService.uploadImages(addEventDTO.getGallery());
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error uploading images or saving event: " + e.getMessage());
		}
		event.setBannerUrl(bannerURL);
		event.setGallery(gallery);
		eventRepo.save(event);
		return ResponseEntity.ok("event create successfully");
	}


}
