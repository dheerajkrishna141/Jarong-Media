package com.jarongmedia_backend.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public ResponseEntity<?> createBooking(@RequestBody HotelBookingDTO dto, Authentication auth) {
		return new ResponseEntity<>(bookingService.bookHotel(dto, auth.getName()), HttpStatus.CREATED);
	}

	@GetMapping("/booking/hotel/all")
	public ResponseEntity<?> getAllBookings(@RequestParam(required = false) Integer pageNo,
			@RequestParam(required = false) Integer pageSize, @RequestParam(required = false) String search_cc) {
		if (pageNo == null) {
			pageNo = 0;
		}
		if (pageSize == null) {
			pageSize = 10;
		}
		if (search_cc.isBlank()) {
			return new ResponseEntity<>(bookingService.getAllBookings((pageNo - 1), pageSize), HttpStatus.OK);
		}
		return new ResponseEntity<>(bookingService.getBookingsByCC((pageNo - 1), pageSize, search_cc), HttpStatus.OK);
	}

	@GetMapping("/booking/hotel/all/{date}")
	public ResponseEntity<?> getBookingsByDate(@RequestParam(required = false) Integer pageNo,
			@RequestParam(required = false) Integer pageSize, @PathVariable String date) {
		if (pageNo == null)
			pageNo = 0;
		if (pageSize == null)
			pageSize = 10;
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

		LocalDate newDate = LocalDate.parse(date, formatter);
		return new ResponseEntity<>(bookingService.getBookingsByDate((pageNo - 1), pageSize, newDate), HttpStatus.OK);
	}

	@PostMapping("/booking/hotel/initiatePayment")
	public ResponseEntity<?> initiatePayment(@RequestBody HotelBookingDTO bookingDTO) {
		return new ResponseEntity<>(paymentService.makePayment(bookingDTO), HttpStatus.CREATED);
	}

	@GetMapping("/booking/hotel/confirmation")
	public ResponseEntity<?> confirmBooking(@RequestParam(required = true, name = "session_id") String sessionId) {

		return new ResponseEntity<>(bookingService.confirmBooking(sessionId), HttpStatus.ACCEPTED);

	}

}
