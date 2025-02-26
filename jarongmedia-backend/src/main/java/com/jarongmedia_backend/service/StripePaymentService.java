package com.jarongmedia_backend.service;

import com.jarongmedia_backend.dto.HotelBookingDTO;
import com.jarongmedia_backend.dto.StripeResponse;

public interface StripePaymentService {

	public StripeResponse makePayment(HotelBookingDTO bookingDTO);
	public String getBookingConfirmationCode(String sessionId);


}
