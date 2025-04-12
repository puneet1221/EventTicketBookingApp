package com.moments_app.config;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.paypal.base.rest.APIContext;

@Configuration
public class PaypalConfig {

	@Value("${paypal.client.id}")
	private String clientId;
	@Value("${paypal.client.secret}")
	private String clientSecret;
	@Value("${paypal.mode}")
	private String paypalMode;

	@Bean
	APIContext apiContext() {
		System.err.print("secret"+clientSecret);
		System.err.print("if"+clientId);
		System.err.print("mode"+paypalMode);
		
		APIContext apiContext = new APIContext(clientId, clientSecret, paypalMode);
		return apiContext;
	}

}
