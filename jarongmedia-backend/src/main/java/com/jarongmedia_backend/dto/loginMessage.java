package com.jarongmedia_backend.dto;

import com.jarongmedia_backend.entities.EndUser;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class loginMessage {

	private String message;
	private boolean status;
	private EndUser endUser;
}
