package com.jarongmedia_backend.service;

import java.util.List;
import java.util.Set;

import com.jarongmedia_backend.documents.Availability;
import com.jarongmedia_backend.documents.Room;
import com.jarongmedia_backend.dto.AvailabilityDTO;
import com.jarongmedia_backend.dto.AvailabilityUIDTO;

public interface AvailabilityService {

	Set<Availability> updateAvailability(AvailabilityDTO availabilityDTO);

	Availability addAvailability(AvailabilityDTO availabilityDTO);

	List<Room> getRoomAvailability(String checkIn, String checkOut);

	Set<Availability> getAvailability();

}
