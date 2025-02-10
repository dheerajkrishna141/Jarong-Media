package com.jarongmedia_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jarongmedia_backend.entities.EndUser;
import com.jarongmedia_backend.entities.OTP;

public interface OTPRepository extends JpaRepository<OTP, Long>{


	void deleteByEndUser(EndUser user);

	OTP findByOtp(long otp);

}
