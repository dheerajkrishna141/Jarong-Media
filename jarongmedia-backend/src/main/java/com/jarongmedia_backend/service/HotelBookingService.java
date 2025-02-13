package com.jarongmedia_backend.service;

import com.jarongmedia_backend.dto.HotelBookingDTO;
import com.jarongmedia_backend.entities.HotelBookingDetails;

public interface HotelBookingService {
	
	public HotelBookingDetails bookHotel(HotelBookingDTO dto, String email);

}
