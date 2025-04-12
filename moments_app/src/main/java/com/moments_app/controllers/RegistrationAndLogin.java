package com.moments_app.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moments_app.entity.Role;
import com.moments_app.entity.User;
import com.moments_app.repo.UserRepo;
import com.moments_app.services.OtpService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/moments/")
public class RegistrationAndLogin {

	private Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private OtpService otpService;

	@GetMapping("/test")
	public String test() {
		return "hello";
	}

	@PostMapping("register")
	@Transactional
	public ResponseEntity<?> handleRegister(@RequestBody User user) {
		if (userRepo.findByUsername(user.getUsername()).isPresent()) {
			return new ResponseEntity<>("User Already Exisits", HttpStatus.BAD_REQUEST);
		}
		User user2 = new User();
		user2.setUsername(user.getUsername());
		user2.setRole(Role.ROLE_USER);
		user2.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepo.save(user2);
		logger.error("test1");
		return new ResponseEntity<>("registered successfully", HttpStatus.CREATED);

	}

	// USED DURING SIGNUP
	@GetMapping("validate-email")
	public ResponseEntity<?> handleEmailValidation(@RequestParam String username) {

		// INITIAL CHECK
		if (userRepo.findByUsername(username).isPresent()) {
			return new ResponseEntity<>("User Already Exisits", HttpStatus.BAD_REQUEST);
		}
		try {
			logger.error("test2");
			otpService.sendOTP(username);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>("server error" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>("otp send successfully", HttpStatus.OK);

	}

	// THIS END POINT WILL BE USED DURING PASSWORD RESET ALSO THATS WHY KEEP AS IT
	@GetMapping("reset-password/send-otp")
	public ResponseEntity<?> handleSendOTP(@RequestParam String username) {
		if (userRepo.findByUsername(username).isEmpty()) {
			return new ResponseEntity<>("username isn't registered", HttpStatus.BAD_REQUEST);
		}
		try {
			otpService.sendOTP(username);
		} catch (Exception e) {
			return new ResponseEntity<>("invalid email", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("otp send successfully", HttpStatus.OK);
	}

	@PostMapping("verify-otp")
	public ResponseEntity<?> handleOTPVerification(@RequestBody UsernameOTP user) {
		if (otpService.validateOTP(user.username(), user.otp())) {
			return new ResponseEntity<>("verified", HttpStatus.OK);
		}
		return new ResponseEntity<>("invalid otp", HttpStatus.BAD_REQUEST);
	}

	// this endpoint will only be used if the otp is verified
	@PostMapping("update-password")
	public ResponseEntity<?> handlePasswordUpdate(@RequestBody User user) {
		User u = userRepo.findByUsername(user.getUsername()).get();
		u.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepo.saveAndFlush(u);
		return new ResponseEntity<>("password updated successfully", HttpStatus.OK);

	}

}

record UsernameOTP(String username, String otp) {

}
