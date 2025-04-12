package com.moments_app.controllers;

import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moments_app.entity.Cart;
import com.moments_app.repo.CartRepo;
import com.moments_app.repo.UserRepo;

@RestController
@RequestMapping(value = "/user/")
public class UserController {
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private CartRepo cartRepo;
	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(getClass());

	// spring security allows to access this endpoint if user is authenticated so we
	// dont need to write custom authentication logic
	@PostMapping("login")
	public ResponseEntity<?> postMethodName(@RequestHeader("Authorization") String authorizationHeader) {
		// remove the Basic
		if (authorizationHeader.startsWith("Basic ")) {
			String credentials = authorizationHeader.substring(6);
			String decodedCredentials = new String(Base64.getDecoder().decode(credentials));
			String[] userCredentails = decodedCredentials.split(":");
			String username = userCredentails[0];
			return new ResponseEntity<>(userRepo.findByUsername(username).get(), HttpStatus.OK);
		}
		return new ResponseEntity<>("server error occurred while login", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// responsible for updating-cartItem --addItem,DeleteItem
	@PutMapping("cart/update-cart")
	public ResponseEntity<?> updateCart(@RequestBody Cart cart) {
		cart = cartRepo.save(cart);
		return new ResponseEntity<>(cart, HttpStatus.OK);

	}

}
