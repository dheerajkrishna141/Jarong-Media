package com.jarongmedia_backend.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
public class RequestForm {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String mobile;
	
	private String arrivalFrom;
	
	private String arrivalTo;
	
	private String travelType;
	
	private String date1;
	
	private String date2;
	
	private long budget;
	
	private String status;
	
	private LocalDate createdDate;
}
