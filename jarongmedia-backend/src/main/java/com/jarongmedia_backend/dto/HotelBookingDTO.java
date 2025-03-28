package com.jarongmedia_backend.dto;

import java.time.LocalDate;
import java.util.HashMap;

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
	
	private HashMap<String, String> customerDetails;
	
	private HashMap<String, String> roomDetails;
	
	private HashMap<String, String> additionalDetails;
	
	private String confirmationCode;
	
	private String status;
		
	private double totalAmount;
}
