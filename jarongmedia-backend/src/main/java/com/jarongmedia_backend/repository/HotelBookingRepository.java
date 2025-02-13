package com.jarongmedia_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jarongmedia_backend.entities.HotelBookingDetails;

public interface HotelBookingRepository extends JpaRepository<HotelBookingDetails, Long>{

}
