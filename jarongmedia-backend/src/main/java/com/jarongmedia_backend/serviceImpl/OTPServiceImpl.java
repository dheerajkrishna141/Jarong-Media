package com.jarongmedia_backend.serviceImpl;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.service.OTPService;

@Service
public class OTPServiceImpl implements OTPService {

	@Autowired
	private SecureRandom random;

	@Override
	public Long generateOTP() {

		long otp = 100000 + random.nextLong(900000);

		return otp;
	}

}
