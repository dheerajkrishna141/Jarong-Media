package com.jarongmedia_backend.dto;

import java.time.LocalDate;

import org.bson.types.ObjectId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AvailabilityDTO {
	
	private String roomId;
	private ObjectId hotelId;
	private LocalDate checkInDate;
	private LocalDate checkOutDate;
	private String status;

}
