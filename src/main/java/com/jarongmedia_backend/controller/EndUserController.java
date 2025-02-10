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
import org.springframework.web.bind.annotation.RestController;

import com.jarongmedia_backend.dto.DeleteMessage;
import com.jarongmedia_backend.dto.EndUserDTO;
import com.jarongmedia_backend.dto.PasswordMessage;
import com.jarongmedia_backend.dto.loginMessage;
import com.jarongmedia_backend.dto.passwordDTO;
import com.jarongmedia_backend.entities.EndUser;
import com.jarongmedia_backend.exceptions.UserNotFoundException;
import com.jarongmedia_backend.exceptions.UserNotUniqueException;
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
		} catch (UserNotUniqueException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/login")
	public ResponseEntity<loginMessage> loginUser(Authentication auth) {

		return new ResponseEntity<loginMessage>(endUserService.loginUser(auth.getName()), HttpStatus.OK);
	}

	@PostMapping("/updatePassword")
	public ResponseEntity<PasswordMessage> updatePassword(Authentication auth, @RequestBody passwordDTO password) {

		PasswordMessage message = new PasswordMessage();
		try {
			message = endUserService.changePassword(auth.getName(), password);
			return new ResponseEntity<PasswordMessage>(message, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			message.setMessage(e.getMessage());
			message.setStatus(false);
			return new ResponseEntity<PasswordMessage>(message, HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<DeleteMessage> deleteUser(@PathVariable long id) {
		DeleteMessage message = new DeleteMessage();
		try {
			message = endUserService.deleteUser(id);
			return new ResponseEntity<DeleteMessage>(message, HttpStatus.ACCEPTED);
		} catch (UserNotFoundException e) {
			message.setMessage(e.getMessage());
			message.setStatus(false);
			return new ResponseEntity<DeleteMessage>(message, HttpStatus.BAD_REQUEST);

		} catch (Exception e) {
			message.setMessage(e.getMessage());
			message.setStatus(false);
			return new ResponseEntity<DeleteMessage>(message, HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}
}
