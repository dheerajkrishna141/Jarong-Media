package com.jarongmedia_backend.serviceImpl;

import java.security.SecureRandom;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.dto.AvailabilityDTO;
import com.jarongmedia_backend.dto.HotelBookingDTO;
import com.jarongmedia_backend.dto.StripeResponse;
import com.jarongmedia_backend.entities.EndUser;
import com.jarongmedia_backend.entities.HotelBookingDetails;
import com.jarongmedia_backend.repository.EndUserRepo;
import com.jarongmedia_backend.repository.HotelBookingRepository;
import com.jarongmedia_backend.service.AvailabilityService;
import com.jarongmedia_backend.service.HotelBookingService;
import com.jarongmedia_backend.service.StripePaymentService;

@Service
public class HotelBookingServiceImpl implements HotelBookingService{
	
	@Autowired
	EndUserRepo endUserRepo;
	
	@Autowired
	StripePaymentService paymentService;
	
	@Autowired
	SecureRandom secureRandom;
	
	@Autowired
	ModelMapper mapper;
	
	@Autowired
	AvailabilityService availabilityService;
	
	@Autowired
	HotelBookingRepository bookingRepository;

	@Override
	public HotelBookingDetails bookHotel(HotelBookingDTO dto, String email) {
		
			EndUser endUser = endUserRepo.findByEmail(email);
			HotelBookingDetails bookingDetails = new HotelBookingDetails();
			bookingDetails.setCheckInDate(dto.getCheckInDate());
			bookingDetails.setCheckOutDate(dto.getCheckOutDate());
			bookingDetails.setHotelId(dto.getHotelId());
			bookingDetails.setRoomId(dto.getRoomId());
			bookingDetails.setTotalAmount(dto.getTotalAmount());
			bookingDetails.setEndUser(endUser);
			bookingDetails.setConfirmationCode(generateRandomCode(6));
			AvailabilityDTO availabilityDTO = mapper.map(dto, AvailabilityDTO.class);
			availabilityDTO.setStatus("booked");
			
			availabilityService.updateAvailability(availabilityDTO);
			
			return bookingRepository.save(bookingDetails);
	
		
		

		
	}
	
	public StripeResponse initiatePayment(HotelBookingDTO dto) {
		return paymentService.makePayment(dto);
	}

	private String generateRandomCode(int length) {
	    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	  
	    StringBuilder code = new StringBuilder(length);
	    for (int i = 0; i < length; i++) {
	        code.append(characters.charAt(secureRandom.nextInt(characters.length())));
	    }
	    return code.toString();
	}

}
