package com.jarongmedia_backend.serviceImpl;

import java.security.SecureRandom;
import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.dto.AvailabilityDTO;
import com.jarongmedia_backend.dto.HotelBookingDTO;
import com.jarongmedia_backend.dto.StripeResponse;
import com.jarongmedia_backend.entities.EndUser;
import com.jarongmedia_backend.entities.HotelBookingDetails;
import com.jarongmedia_backend.repository.EndUserRepo;
import com.jarongmedia_backend.repository.HotelBookingRepository;
import com.jarongmedia_backend.service.AvailabilityService;
import com.jarongmedia_backend.service.EmailService;
import com.jarongmedia_backend.service.HotelBookingService;
import com.jarongmedia_backend.service.StripePaymentService;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class HotelBookingServiceImpl implements HotelBookingService {

	@Autowired
	EndUserRepo endUserRepo;

	@Autowired
	StripePaymentService paymentService;

	@Autowired
	ModelMapper mapper;

	@Autowired
	EmailService emailService;

	@Autowired
	SecureRandom secureRandom;

	@Autowired
	AvailabilityService availabilityService;

	@Autowired
	HotelBookingRepository bookingRepository;

	@Value("${httpOnly.cookie.domain}")
	String domain;

	@Override
	public HotelBookingDetails bookHotel(HotelBookingDTO dto, String email, HttpServletResponse response) {

		EndUser endUser = endUserRepo.findByEmail(email);
		HotelBookingDetails bookingDetails = new HotelBookingDetails();
		bookingDetails.setCheckInDate(dto.getCheckInDate());
		bookingDetails.setCheckOutDate(dto.getCheckOutDate());
		bookingDetails.setHotelId(dto.getHotelId());
		bookingDetails.setRoomId(dto.getRoomId());
		bookingDetails.setTotalAmount(dto.getTotalAmount());
		bookingDetails.setAdditionalDetails(dto.getAdditionalDetails());
		bookingDetails.setCustomerDetails(dto.getCustomerDetails());
		bookingDetails.setRoomDetails(dto.getRoomDetails());
		bookingDetails.setStatus(dto.getStatus());
		bookingDetails.setEndUser(endUser);
		String randomCode = generateRandomCode(6);
		bookingDetails.setConfirmationCode(randomCode);
		AvailabilityDTO availabilityDTO = mapper.map(dto, AvailabilityDTO.class);
		availabilityDTO.setStatus(dto.getStatus());

		availabilityService.updateAvailability(availabilityDTO);

		var cookie = ResponseCookie.from("CC").value(randomCode).httpOnly(true).domain(domain).path("/").build();

		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
		return bookingRepository.save(bookingDetails);

	}

	public StripeResponse initiatePayment(String CC) {
		return paymentService.makePayment(CC);
	}

	public HotelBookingDetails confirmBooking(String sessionId) {
		String confirmationCode = paymentService.getBookingConfirmationCode(sessionId);

		HotelBookingDetails bookingDetails = bookingRepository.findByConfirmationCode(confirmationCode);
		bookingDetails.setStatus("booked");
		AvailabilityDTO availabilityDTO = mapper.map(bookingDetails, AvailabilityDTO.class);
		availabilityService.updateAvailability(availabilityDTO);

		emailService.sendBookingConfirmationEmail(bookingDetails);

		return bookingRepository.save(bookingDetails);

	}

	private String generateRandomCode(int length) {
		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		StringBuilder code = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
			code.append(characters.charAt(secureRandom.nextInt(characters.length())));
		}
		return code.toString();
	}

	@Override
	public Page<HotelBookingDetails> getAllBookings(Integer pageNo, Integer pageSize) {

		Pageable page = PageRequest.of(pageNo, pageSize);
		return bookingRepository.findAll(page);
	}

	@Override
	public Page<HotelBookingDetails> getBookingsByDate(Integer pageNo, Integer pageSize, LocalDate date) {
		Pageable page = PageRequest.of(pageNo, pageSize);
		return bookingRepository.findByCheckInDate(page, date);
	}

	@Override
	public Page<HotelBookingDetails> getBookingsByCC(Integer pageNo, Integer pageSize, String search_cc) {
		Pageable page = PageRequest.of(pageNo, pageSize);

		return bookingRepository.findByConfirmationCode(page, search_cc);
	}

}
