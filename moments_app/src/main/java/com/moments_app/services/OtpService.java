package com.moments_app.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

	@Autowired
	private JavaMailSender javaMailSender;

	private final Map<String, String> otpStorage = new HashMap<>();
	private final Random random = new Random();

	public String generateOTP() {
		return random.nextInt(100000, 999999) + "";

	}

	public void sendOTP(String email) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(email);
		mailMessage.setSubject("Your OTP for Moments App");
		String otp = this.generateOTP();
		System.err.println(otp);
		mailMessage.setText("Your OTP is: " + otp + "\nIt is valid for 5 minutes.");
		otpStorage.put(email, otp);
		javaMailSender.send(mailMessage);

	}

	public boolean validateOTP(String mail, String otp) {
		if (otpStorage.containsKey(mail)) {
			return otpStorage.get(mail).equals(otp);
		}
		return false;
	}

}
