package com.jarongmedia_backend.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.jarongmedia_backend.entities.Roles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EndUserDTO {
	
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private Date dob;
	private Set<String> roles = new HashSet<String>();

}
