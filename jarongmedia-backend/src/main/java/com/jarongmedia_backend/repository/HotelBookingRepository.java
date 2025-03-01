package com.jarongmedia_backend.repository;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jarongmedia_backend.entities.HotelBookingDetails;
import java.util.List;


@Repository
public interface HotelBookingRepository extends JpaRepository<HotelBookingDetails, Long>{

	Page<HotelBookingDetails> findByConfirmationCode(Pageable page, String confirmationCode);
	
	HotelBookingDetails  findByConfirmationCode(String confirmationCode);

	Page<HotelBookingDetails> findByCheckInDateGreaterThanEqual(Pageable page, LocalDate date);

	Page<HotelBookingDetails> findByCheckInDate(Pageable page, LocalDate date);

}
