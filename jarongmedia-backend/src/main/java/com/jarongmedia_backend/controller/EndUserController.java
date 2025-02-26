package com.jarongmedia_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jarongmedia_backend.dto.DeleteMessage;
import com.jarongmedia_backend.dto.EndUserDTO;
import com.jarongmedia_backend.dto.StatusMessage;
import com.jarongmedia_backend.dto.loginMessage;
import com.jarongmedia_backend.dto.passwordDTO;
import com.jarongmedia_backend.entities.EndUser;
import com.jarongmedia_backend.exceptions.EntityNotFoundException;
import com.jarongmedia_backend.exceptions.EntityNotUniqueException;
import com.jarongmedia_backend.exceptions.UserNotVerifiedException;
import com.jarongmedia_backend.service.EndUserService;

@RestController
@RequestMapping("/user")
public class EndUserController {

	@Autowired
	private EndUserService endUserService;

	@PostMapping("/register")
	public ResponseEntity<?> createUser(@RequestBody EndUserDTO userdto) {
		try {
			return new ResponseEntity<EndUser>(endUserService.createUser(userdto), HttpStatus.CREATED);
		} catch (EntityNotUniqueException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/login")
	public ResponseEntity<?> loginUser(Authentication auth) {

		try {
			return new ResponseEntity<loginMessage>(endUserService.loginUser(auth.getName()), HttpStatus.OK);
		} catch (UserNotVerifiedException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/me")
	public ResponseEntity<?> getUser(Authentication auth){
		return new ResponseEntity<loginMessage>(endUserService.loginUser(auth.getName()), HttpStatus.OK);
	}

	@PostMapping("/verify")
	public ResponseEntity<?> verfiyUser(@RequestParam(required = true, name = "verification_otp") long otp) {
		StatusMessage message = endUserService.verifyUser(otp);
		if (message.isStatus()) {
			return new ResponseEntity<>(message, HttpStatus.ACCEPTED);

		} else {
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		}

	}

	@PostMapping("/updatePassword")
	public ResponseEntity<?> updatePassword(Authentication auth, @RequestBody passwordDTO password) {

		try {

			return new ResponseEntity<StatusMessage>(endUserService.changePassword(auth.getName(), password),
					HttpStatus.ACCEPTED);
		} catch (Exception e) {

			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable long id) {
		try {
			return new ResponseEntity<DeleteMessage>(endUserService.deleteUser(id), HttpStatus.ACCEPTED);
		} catch (EntityNotFoundException e) {

			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}

	
}
