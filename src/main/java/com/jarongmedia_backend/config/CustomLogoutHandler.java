package com.jarongmedia_backend.config;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class CustomLogoutHandler implements LogoutSuccessHandler {

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		LocalDateTime currentTimeStamp = LocalDateTime.now();
		String message = "Successfully logged out!";
		String path = request.getRequestURI();
		response.setStatus(HttpStatus.ACCEPTED.value());
		response.setContentType("application/json;charset=UTF-8");
		String jsonResponse = String.format(
				"{\"timestamp\": \"%s\", \"status\": %d, \"error\": \"%s\", \"message\": \"%s\", \"path\": \"%s\"}",
				currentTimeStamp, HttpStatus.ACCEPTED.value(), HttpStatus.ACCEPTED.getReasonPhrase(), message, path);
		response.getWriter().write(jsonResponse);

	}

}
