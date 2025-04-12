package com.moments_app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.moments_app.entity.User;
import com.moments_app.repo.UserRepo;


public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("User Not found"));
		return new CustomUserDetails(user);
	}

}
