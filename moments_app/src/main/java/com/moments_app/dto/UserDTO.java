package com.moments_app.dto;

import com.moments_app.entity.User;

public class UserDTO {

	UserDTO(User user) {
		this.username = user.getUsername();
	}

	private String username;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
