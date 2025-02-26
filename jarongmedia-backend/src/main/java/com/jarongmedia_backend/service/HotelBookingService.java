package com.jarongmedia_backend.service;

import java.time.LocalDate;

import org.springframework.data.domain.Page;

import com.jarongmedia_backend.dto.HotelBookingDTO;
import com.jarongmedia_backend.entities.HotelBookingDetails;

public interface HotelBookingService {

	public HotelBookingDetails bookHotel(HotelBookingDTO dto, String email);

	public HotelBookingDetails confirmBooking(String sessionId);

	Page<HotelBookingDetails> getAllBookings(Integer pageNo, Integer pageSize);


	public Page<HotelBookingDetails> getBookingsByDate(Integer pageNo, Integer pageSize, LocalDate newDate);

	public Page<HotelBookingDetails> getBookingsByCC(Integer pageNo, Integer pageSize,String search_cc);

}
