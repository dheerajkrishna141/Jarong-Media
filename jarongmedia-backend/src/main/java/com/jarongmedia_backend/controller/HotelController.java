package com.jarongmedia_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jarongmedia_backend.dto.AvailabilityDTO;
import com.jarongmedia_backend.dto.FeatureDTO;
import com.jarongmedia_backend.dto.HotelDTO;
import com.jarongmedia_backend.dto.RoomDTO;
import com.jarongmedia_backend.service.AvailabilityService;
import com.jarongmedia_backend.service.HotelService;

@RestController
@RequestMapping("/admin/hotel")
public class HotelController {
	@Autowired
	HotelService hotelService;

	@Autowired
	AvailabilityService availabilityService;

	@PostMapping("/create")
	public ResponseEntity<?> createHotel(@RequestBody HotelDTO dto) {
		return new ResponseEntity<>(hotelService.createHotel(dto), HttpStatus.CREATED);

	}

	@PostMapping("/feature")
	public ResponseEntity<?> createFeature(@RequestBody FeatureDTO dto) {
		return new ResponseEntity<>(hotelService.createFeature(dto), HttpStatus.CREATED);

	}

	@GetMapping("/feature/all")
	public ResponseEntity<?> getFeatures() {

		return new ResponseEntity<>(hotelService.getFeatures(), HttpStatus.OK);

	}

	@GetMapping("/hotel/{id}")
	public ResponseEntity<?> getHotelById(@PathVariable String id) {

		return new ResponseEntity<>(hotelService.getHotelById(id), HttpStatus.OK);
	}

	@PostMapping("/room")
	public ResponseEntity<?> createRoom(@RequestBody RoomDTO dto) {
		return new ResponseEntity<>(hotelService.createRoom(dto), HttpStatus.CREATED);

	}

	@PostMapping("/room/availability")
	public ResponseEntity<?> addAvailability(@RequestBody AvailabilityDTO dto) {
		return new ResponseEntity<>(availabilityService.addAvailability(dto), HttpStatus.ACCEPTED);
	}

	@PutMapping("/room/availability")
	public ResponseEntity<?> updateAvailability(@RequestBody AvailabilityDTO dto) {
		return new ResponseEntity<>(availabilityService.updateAvailability(dto), HttpStatus.ACCEPTED);
	}
}
