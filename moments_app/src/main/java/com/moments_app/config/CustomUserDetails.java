package com.moments_app.config;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.moments_app.entity.User;

public class CustomUserDetails implements UserDetails {

	private User user;

	CustomUserDetails(User user) {
		this.user = user;
	}

	private static final long serialVersionUID = 1L;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		SimpleGrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getRole().name());
		return List.of(grantedAuthority);

	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}

}
