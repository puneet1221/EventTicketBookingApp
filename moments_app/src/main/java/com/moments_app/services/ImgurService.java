package com.moments_app.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ImgurService {

	@Value("${imgur.client-id}")
	private String clientId;
	private static final String IMGUR_API_URL = "https://api.imgur.com/3/image";

	public String uploadImage(MultipartFile file) throws IOException {
		// Encode the image as Base64
		String base64Image = Base64.getEncoder().encodeToString(file.getBytes());

		// Prepare the headers for authentication
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Client-ID " + clientId);

		// Prepare the request body
		MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
		body.add("image", base64Image);
		body.add("type", "base64");

		// Create the request entity
		HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

		// Make the API call using RestTemplate
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(IMGUR_API_URL, HttpMethod.POST, requestEntity,
				String.class);

		// Parse the response to extract the image link
		if (response.getStatusCode().is2xxSuccessful()) {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode responseJson = objectMapper.readTree(response.getBody());
			String imageUrl = responseJson.path("data").path("link").asText();
			return imageUrl;
		} else {
			throw new RuntimeException("Image upload failed with status: " + response.getStatusCode() + ", response: "
					+ response.getBody());
		}
	}

	public List<String> uploadImages(@RequestParam("files") List<MultipartFile> images) {
		List<String> imageUrls = new ArrayList<>();
		try {
			for (MultipartFile image : images) {
				String url = uploadImage(image);
				imageUrls.add(url);
			}
		} catch (IOException exception) {
			return null;
		}
		return imageUrls;
	}

}
