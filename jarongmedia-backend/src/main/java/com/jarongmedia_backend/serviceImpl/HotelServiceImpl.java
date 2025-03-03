package com.jarongmedia_backend.serviceImpl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.documents.Availability;
import com.jarongmedia_backend.documents.Features;
import com.jarongmedia_backend.documents.Hotel;
import com.jarongmedia_backend.documents.Room;
import com.jarongmedia_backend.dto.FeatureDTO;
import com.jarongmedia_backend.dto.HotelDTO;
import com.jarongmedia_backend.dto.RoomDTO;
import com.jarongmedia_backend.exceptions.EntityNotFoundException;
import com.jarongmedia_backend.exceptions.EntityNotUniqueException;
import com.jarongmedia_backend.repository.AvailabilityRepository;
import com.jarongmedia_backend.repository.FeatureRepository;
import com.jarongmedia_backend.repository.HotelRepository;
import com.jarongmedia_backend.repository.RoomRepository;
import com.jarongmedia_backend.service.HotelService;

@Service
public class HotelServiceImpl implements HotelService {

	@Autowired
	HotelRepository hotelRepository;

	@Autowired
	ModelMapper mapper;

	@Autowired
	FeatureRepository featureRepository;

	@Autowired
	RoomRepository roomRepository;

	@Autowired
	AvailabilityRepository availabilityRepository;

	@Override
	public Hotel createHotel(HotelDTO hotelDTO) {

		Hotel hotel = hotelRepository.findByName(hotelDTO.getName());

		if (hotel == null) {
			hotel = mapper.map(hotelDTO, Hotel.class);

			return hotelRepository.save(hotel);
		} else {
			throw new EntityNotUniqueException("Hotel name: " + hotelDTO.getName() + " already exists!");
		}

	}

	@Override
	public Room createRoom(RoomDTO roomDTO) {
		Optional<Room> rOptional = roomRepository.findById(roomDTO.getId());

		if (rOptional.isEmpty()) {
			Room room = mapper.map(roomDTO, Room.class);
			room.setAvailability(new HashSet<Availability>());
			room.setFeatures(new ArrayList<Features>());
			for (String a : roomDTO.getFeatures()) {

				Optional<Features> fOptional = featureRepository.findById(a);
				if (fOptional.isPresent()) {
					Features features = fOptional.get();
					room.getFeatures().add(features);

				}
			}
			room = roomRepository.save(room);

			Hotel hotel = hotelRepository.findById(roomDTO.getHotelId()).orElseThrow(
					() -> new EntityNotFoundException("Hotel with id: " + roomDTO.getHotelId() + " not found"));
			hotel.getRooms().add(room);
			hotelRepository.save(hotel);
			return room;

		} else {
			throw new EntityNotUniqueException("Room with name: " + roomDTO.getId() + " is not unique!");
		}

	}

	public Room getRoom(String roomId) {
		return roomRepository.findById(roomId)
				.orElseThrow(() -> new EntityNotFoundException("Room with Id: " + roomId + " not found!"));
	}

	@Override
	public Features createFeature(FeatureDTO featureDTO) {

		Optional<Features> fOptional = featureRepository.findById(featureDTO.getId());
		if (fOptional.isEmpty()) {
			Features features = mapper.map(featureDTO, Features.class);
			return featureRepository.save(features);

		} else {
			throw new EntityNotUniqueException("Feature with name: " + featureDTO.getId() + " is not unique!");
		}

	}

	@Override
	public List<Features> getFeatures() {
		List<Features> features = featureRepository.findAll();
		if (features.isEmpty())
			throw new EntityNotFoundException("No features are present, add features!");
		return features;

	}

	@Override
	public List<Hotel> getHotels() {
		List<Hotel> hotels = hotelRepository.findAll();
		if (hotels.isEmpty())
			throw new EntityNotFoundException("No hotels are present, add hotels!");
		return hotels;
	}

	@Override
	public Page<Room> getRooms(Integer pageNo, Integer pageSize) {
		Pageable page = PageRequest.of(pageNo, pageSize);

		Page<Room> rooms = roomRepository.findAll(page);
		if (rooms.isEmpty())
			throw new EntityNotFoundException("No rooms are present, add rooms!");
		return rooms;
	}

	@Override
	public Hotel getHotelById(String id) {
		ObjectId objectId = new ObjectId(id);
		return hotelRepository.findById(objectId).orElseThrow(()-> new EntityNotFoundException("Hotel Not Found!"));
	}



}
