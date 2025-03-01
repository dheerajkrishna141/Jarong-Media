//package com.jarongmedia_backend.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.jarongmedia_backend.service.OAuthService;
//
//import jakarta.servlet.http.HttpServletRequest;
//
//@RestController
//@RequestMapping("/auth/google")
//public class GoogleAuthController {
//
//	@Autowired
//	OAuthService authService;
//
//	@GetMapping("/callback")
//	public ResponseEntity<?> handleGoogleCallBack(@RequestParam String code, HttpServletRequest request) {
//
//		return new ResponseEntity<>(authService.OAuth2Authentication(code, request), HttpStatus.ACCEPTED);
//
//	}
//
//}
