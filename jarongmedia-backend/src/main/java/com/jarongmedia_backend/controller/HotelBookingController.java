package com.jarongmedia_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jarongmedia_backend.dto.HotelBookingDTO;
import com.jarongmedia_backend.service.HotelBookingService;
import com.jarongmedia_backend.service.StripePaymentService;

@RestController
@RequestMapping("/user")
public class HotelBookingController {
	
	@Autowired
	HotelBookingService bookingService;
	
	@Autowired
	StripePaymentService paymentService;
	
	@PostMapping("/booking/hotel")
	public ResponseEntity<?> createBooking(@RequestBody HotelBookingDTO dto, Authentication auth){
		return new ResponseEntity<>(bookingService.bookHotel(dto, auth.getName()), HttpStatus.CREATED);
	}
	
	@GetMapping("/booking/hotel/initiatePayment")
	public ResponseEntity<?> initiatePayment(@RequestBody HotelBookingDTO bookingDTO){
		return new ResponseEntity<>(paymentService.makePayment(bookingDTO), HttpStatus.CREATED);
	}

}
