package com.jarongmedia_backend.service;

import com.jarongmedia_backend.dto.HotelBookingDTO;
import com.jarongmedia_backend.dto.StripeResponse;

public interface StripePaymentService {

	public String getBookingConfirmationCode(String sessionId);
	StripeResponse makePayment(String CC);


}
