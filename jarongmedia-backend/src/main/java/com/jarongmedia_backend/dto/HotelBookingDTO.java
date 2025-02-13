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
public class HotelBookingDTO {

	
	private ObjectId hotelId;
	
	private String roomId;
	
	private LocalDate checkInDate;
	
	private LocalDate checkOutDate;
		
	private double totalAmount;
}
