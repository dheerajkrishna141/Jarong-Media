package com.jarongmedia_backend.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestFormDTO {

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
