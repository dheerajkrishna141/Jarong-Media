package com.jarongmedia_backend.service;

import com.jarongmedia_backend.dto.loginMessage;

import jakarta.servlet.http.HttpServletRequest;

public interface OAuthService {


	loginMessage OAuth2Authentication(String authCode, HttpServletRequest request);
}
