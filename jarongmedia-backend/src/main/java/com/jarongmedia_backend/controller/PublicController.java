package com.jarongmedia_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jarongmedia_backend.dto.AvailabilityDTO;
import com.jarongmedia_backend.service.AvailabilityService;
import com.jarongmedia_backend.service.HotelService;

@RestController
@RequestMapping("/public")
public class PublicController {

	@Autowired
	AvailabilityService availabilityService;
	
	@Autowired
	HotelService hotelService;
	
	@GetMapping("/room/{roomId}")
	public ResponseEntity<?> getRoom(@PathVariable String roomId) {
		return new ResponseEntity<>(hotelService.getRoom(roomId), HttpStatus.OK);
	}
	@GetMapping("/room/availability")
	public ResponseEntity<?> getAvailability(@RequestBody AvailabilityDTO dto) {
		return new ResponseEntity<>(availabilityService.getAvailability(dto), HttpStatus.OK);
	}

	@GetMapping("/room/availability/all")
	public ResponseEntity<?> getAvailability() {
		return new ResponseEntity<>(availabilityService.getAvailability(), HttpStatus.OK);
	}

}
