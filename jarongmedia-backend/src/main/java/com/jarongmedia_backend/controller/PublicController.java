package com.jarongmedia_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jarongmedia_backend.dto.RequestFormDTO;
import com.jarongmedia_backend.repository.RoomRepository;
import com.jarongmedia_backend.service.AvailabilityService;
import com.jarongmedia_backend.service.HotelService;
import com.jarongmedia_backend.service.RequestFormService;

@RestController
@RequestMapping("/public")
public class PublicController {

	@Autowired
	AvailabilityService availabilityService;

	@Autowired
	HotelService hotelService;

	@Autowired
	RoomRepository roomRepository;

	@Autowired
	RequestFormService formService;

	@GetMapping("/room/{roomId}")
	public ResponseEntity<?> getRoom(@PathVariable String roomId) {
		return new ResponseEntity<>(hotelService.getRoom(roomId), HttpStatus.OK);
	}

	@GetMapping("/room/availability")
	public ResponseEntity<?> getAvailability(@RequestParam String checkIn, @RequestParam String checkOut) {
		return new ResponseEntity<>(availabilityService.getRoomAvailability(checkIn, checkOut), HttpStatus.OK);
	}

	@GetMapping("/room/availability/all")
	public ResponseEntity<?> getAvailability() {
		return new ResponseEntity<>(availabilityService.getAvailability(), HttpStatus.OK);
	}

	@GetMapping("/hotel/all")
	public ResponseEntity<?> getHotels() {

		return new ResponseEntity<>(hotelService.getHotels(), HttpStatus.OK);

	}

	@PostMapping("/request")
	public ResponseEntity<?> createRequest(@RequestBody RequestFormDTO dto) {

		return new ResponseEntity<>(formService.createRequest(dto), HttpStatus.CREATED);

	}

	@GetMapping("/room/all")
	public ResponseEntity<?> getRooms(@RequestParam(required = false) Integer pageNo,
			@RequestParam(required = false) Integer pageSize) {

		if (pageNo == null)
			pageNo = 1;
		if (pageSize == null)
			pageSize = 6;
		return new ResponseEntity<>(hotelService.getRooms((pageNo - 1), pageSize), HttpStatus.OK);

	}

}
