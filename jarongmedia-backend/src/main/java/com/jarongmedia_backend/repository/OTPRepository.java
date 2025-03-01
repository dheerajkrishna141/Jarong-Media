package com.jarongmedia_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jarongmedia_backend.entities.EndUser;
import com.jarongmedia_backend.entities.OTP;
@Repository
public interface OTPRepository extends JpaRepository<OTP, Long>{


	void deleteByEndUser(EndUser user);

	OTP findByOtp(long otp);

}
