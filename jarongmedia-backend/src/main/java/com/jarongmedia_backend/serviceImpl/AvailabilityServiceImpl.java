package com.jarongmedia_backend.serviceImpl;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.documents.Availability;
import com.jarongmedia_backend.documents.Room;
import com.jarongmedia_backend.dto.AvailabilityDTO;
import com.jarongmedia_backend.exceptions.EntityNotFoundException;
import com.jarongmedia_backend.exceptions.OperationNotAllowed;
import com.jarongmedia_backend.repository.AvailabilityRepository;
import com.jarongmedia_backend.repository.FeatureRepository;
import com.jarongmedia_backend.repository.HotelRepository;
import com.jarongmedia_backend.repository.RoomRepository;
import com.jarongmedia_backend.service.AvailabilityService;

@Service
public class AvailabilityServiceImpl implements AvailabilityService {
	HotelRepository hotelRepository;

	@Autowired
	ModelMapper mapper;

	@Autowired
	FeatureRepository featureRepository;

	@Autowired
	RoomRepository roomRepository;

	@Autowired
	AvailabilityRepository availabilityRepository;

	public Set<Availability> updateAvailability(AvailabilityDTO availabilityDTO) {
		Room room = roomRepository.findById(availabilityDTO.getRoomId()).orElseThrow(
				() -> new EntityNotFoundException("Room with room id: " + availabilityDTO.getRoomId() + " not found"));

		Set<Availability> existingAvailabilities = room.getAvailability();
		if (existingAvailabilities.isEmpty()) {
			throw new OperationNotAllowed("No availability found!");
		}

		LocalDate newCheckIn = availabilityDTO.getCheckInDate();
		LocalDate newCheckOut = availabilityDTO.getCheckOutDate();
		Set<Availability> updatedAvailabilities = new HashSet<>();

		for (Availability currentAvailability : existingAvailabilities) {
			if (!currentAvailability.getStatus().equals("available")) {
				continue; // Skip non-available records
			}

			LocalDate currentCheckIn = currentAvailability.getCheckInDate();
			LocalDate currentCheckOut = currentAvailability.getCheckOutDate();

			if (isExactMatch(newCheckIn, newCheckOut, currentCheckIn, currentCheckOut)) {
				currentAvailability.setStatus(availabilityDTO.getStatus());
				updatedAvailabilities.add(currentAvailability);
				break;
			}

			if (isWithinRange(newCheckIn, newCheckOut, currentCheckIn, currentCheckOut)) {
				Set<Availability> splitResults = splitAvailability(currentAvailability, newCheckIn, newCheckOut,
						availabilityDTO);

				// Modify the existing availability instead of creating a new one
				existingAvailabilities.remove(currentAvailability);
				existingAvailabilities.addAll(splitResults);

				updatedAvailabilities.addAll(splitResults);
				break;
			}
		}

		if (updatedAvailabilities.isEmpty()) {
			throw new OperationNotAllowed("No availability found!");
		}

		availabilityRepository.saveAll(updatedAvailabilities);
		roomRepository.save(room);

		return updatedAvailabilities;
	}

	private boolean isExactMatch(LocalDate newCheckIn, LocalDate newCheckOut, LocalDate currentCheckIn,
			LocalDate currentCheckOut) {
		return newCheckIn.isEqual(currentCheckIn) && newCheckOut.isEqual(currentCheckOut);
	}

	private boolean isWithinRange(LocalDate newCheckIn, LocalDate newCheckOut, LocalDate currentCheckIn,
			LocalDate currentCheckOut) {
		return (newCheckIn.isAfter(currentCheckIn) || newCheckIn.isEqual(currentCheckIn))
				&& (newCheckOut.isBefore(currentCheckOut) || newCheckOut.isEqual(currentCheckOut));
	}

	private Set<Availability> splitAvailability(Availability currentAvailability, LocalDate newCheckIn,
			LocalDate newCheckOut, AvailabilityDTO availabilityDTO) {
		Set<Availability> splitAvailabilities = new HashSet<>();

		LocalDate currentCheckIn = currentAvailability.getCheckInDate();
		LocalDate currentCheckOut = currentAvailability.getCheckOutDate();

		currentAvailability.setCheckInDate(newCheckIn);
		currentAvailability.setCheckOutDate(newCheckOut);
		currentAvailability.setStatus(availabilityDTO.getStatus());
		splitAvailabilities.add(currentAvailability);

		if (currentCheckIn.isBefore(newCheckIn)) {
			Availability beforeAvailability = createAvailability(currentCheckIn, newCheckIn.minusDays(1),
					availabilityDTO);
			if (beforeAvailability != null) {
				splitAvailabilities.add(beforeAvailability);
			}
		}

		if (currentCheckOut.isAfter(newCheckOut)) {
			Availability afterAvailability = createAvailability(newCheckOut.plusDays(1), currentCheckOut,
					availabilityDTO);
			if (afterAvailability != null) {
				splitAvailabilities.add(afterAvailability);
			}
		}

		return splitAvailabilities;
	}

	private Availability createAvailability(LocalDate checkIn, LocalDate checkOut, AvailabilityDTO availabilityDTO) {
		if (!checkIn.isBefore(checkOut)) {
			return null; // Prevent invalid availability creation
		}
		Availability availability = new Availability();
		availability.setCheckInDate(checkIn);
		availability.setCheckOutDate(checkOut);
		availability.setStatus("available");
		availability.setHotelId(availabilityDTO.getHotelId());
		availability.setRoomId(availabilityDTO.getRoomId());
		return availability;
	}

	public Availability addAvailability(AvailabilityDTO availabilityDTO) {
		Room room = roomRepository.findById(availabilityDTO.getRoomId()).orElseThrow(
				() -> new EntityNotFoundException("Room with room id: " + availabilityDTO.getRoomId() + " not found"));

		Set<Availability> existingAvailabilities = room.getAvailability();
		LocalDate newCheckIn = availabilityDTO.getCheckInDate();
		LocalDate newCheckOut = availabilityDTO.getCheckOutDate();

		// Ensure valid date range
		if (newCheckIn.isEqual(newCheckOut)) {
			throw new OperationNotAllowed("Check-in and check-out dates cannot be the same.");
		}

		// Check for conflicts
		for (Availability currentAvailability : existingAvailabilities) {
			LocalDate currentCheckIn = currentAvailability.getCheckInDate();
			LocalDate currentCheckOut = currentAvailability.getCheckOutDate();

			if (!(newCheckOut.isBefore(currentCheckIn) || newCheckIn.isAfter(currentCheckOut))) {
				throw new OperationNotAllowed("Conflicting availability exists for this date range.");
			}
		}

		// Create new availability
		Availability newAvailability = createAvailability(availabilityDTO);

		// Save new availability and update room
		newAvailability = availabilityRepository.save(newAvailability);
		room.getAvailability().add(newAvailability);
		roomRepository.save(room);

		return newAvailability;
	}

	private Availability createAvailability(AvailabilityDTO availabilityDTO) {
		Availability availability = new Availability();
		availability.setCheckInDate(availabilityDTO.getCheckInDate());
		availability.setCheckOutDate(availabilityDTO.getCheckOutDate());
		availability.setHotelId(availabilityDTO.getHotelId());
		availability.setRoomId(availabilityDTO.getRoomId());
		availability.setStatus(availabilityDTO.getStatus());
		return availability;
	}
}
