package com.moments_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

	@SuppressWarnings("removal")
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors(cors -> cors.configurationSource(corsConfigurationSource())) // Apply CORS configuration
                .csrf(csrf -> csrf.disable()) // Disable CSRF for API-based applications
                .authorizeHttpRequests(auth -> auth.requestMatchers("/admin/**").hasRole("ADMIN") // Admin access
                                // restricted
                				.requestMatchers("/user/payment-success").permitAll()
                				.requestMatchers("user/payment-cancelled").permitAll()
                                .requestMatchers("/user/**").hasAnyRole("USER","ADMIN") // User access restricted
                                .requestMatchers("/moments/**").permitAll()
                                .anyRequest().authenticated() // All other requests must be authenticated
				).httpBasic(); // Use Basic Authentication for API requests

		return httpSecurity.build();
	}

	//only during development no cors issues if we deploy our frontend and backend on same domai
	private UrlBasedCorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedOrigin("http://localhost:5173"); // Allow cors from react se a
		config.addAllowedMethod("GET");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("DELETE");
		config.addAllowedHeader("*"); // Allow all headers
		source.registerCorsConfiguration("/**", config); // Apply this configuration to all paths
		return source;
	}

	@Bean
	UserDetailsService userDetailsService() {
		return new UserDetailsServiceImpl(); // Custom UserDetailsService to load user from DB
	}

	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder(); // BCrypt password encoder
	}

	@Bean
	DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService()); // Inject the custom UserDetailsService
		authenticationProvider.setPasswordEncoder(bCryptPasswordEncoder()); // Set password encoder
		return authenticationProvider;
	}
}
