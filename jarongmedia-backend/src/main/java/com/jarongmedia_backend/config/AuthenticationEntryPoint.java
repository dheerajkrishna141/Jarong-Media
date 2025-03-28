package com.jarongmedia_backend.config;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class AuthenticationEntryPoint implements org.springframework.security.web.AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {

		LocalDateTime currentTimeStamp = LocalDateTime.now();
		String message = (authException != null && authException.getMessage() != null) ? authException.getMessage()
				: "Unauthorized";
		String path = request.getRequestURI();
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType("application/json;charset=UTF-8");
		String jsonResponse = String.format(
				"{\"timestamp\": \"%s\", \"status\": %d, \"error\": \"%s\", \"message\": \"%s\", \"path\": \"%s\"}",
				currentTimeStamp, HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase(), message, path);
		response.getWriter().write(jsonResponse);
	}

}
