package com.jarongmedia_backend.service;

import java.util.List;
import java.util.Set;

import com.jarongmedia_backend.documents.Availability;
import com.jarongmedia_backend.dto.AvailabilityDTO;

public interface AvailabilityService {


	public Set<Availability> updateAvailability(AvailabilityDTO availabilityDTO);
	
	public Availability addAvailability(AvailabilityDTO availabilityDTO);

}
