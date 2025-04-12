package com.moments_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.moments_app.entity.Role;
import com.moments_app.entity.User;
import com.moments_app.repo.UserRepo;

import jakarta.transaction.Transactional;

@SpringBootApplication
public class MomentsAppApplication {
	@Autowired
	private UserRepo userRepo;

	public static void main(String[] args) {
		SpringApplication.run(MomentsAppApplication.class, args);
	}

	@Transactional
	@Bean
	CommandLineRunner run() {
		return args -> {
			try {
				User u = userRepo.findById(2l).orElseThrow(() -> new RuntimeException("main method code faield"));
				u.setRole(Role.ROLE_ADMIN);
				userRepo.save(u);
			}catch(Exception e) {
				
			}
			
		};
	}
}
