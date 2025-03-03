package com.jarongmedia_backend.service;

import com.jarongmedia_backend.entities.HotelBookingDetails;

public interface EmailService {

	public void sendVerificationEmail(String to, long otp);

	void sendBookingConfirmationEmail(HotelBookingDetails dto);
}
