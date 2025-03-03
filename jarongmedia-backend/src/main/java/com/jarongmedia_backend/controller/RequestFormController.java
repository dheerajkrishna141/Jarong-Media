package com.jarongmedia_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jarongmedia_backend.service.RequestFormService;

@RestController
@RequestMapping("/admin/requests")
public class RequestFormController {

	@Autowired
	RequestFormService formService;

	@GetMapping
	public ResponseEntity<?> getAllRequests(@RequestParam(required = false, defaultValue = "1") Integer pageNo,
			@RequestParam(required = false, defaultValue = "10") Integer pageSize) {
		return new ResponseEntity<>(formService.getAllRequests(pageNo - 1, pageSize), HttpStatus.OK);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<?> updateRequest(@RequestParam String status, @PathVariable long id) {
		return new ResponseEntity<>(formService.updateRequestStatus(status, id), HttpStatus.OK);

	}

	@DeleteMapping
	public ResponseEntity<?> deleteRequest(@RequestParam long id) {
		return new ResponseEntity<>(formService.deleteRequest(id), HttpStatus.OK);

	}

}
