package com.jarongmedia_backend.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.jarongmedia_backend.documents.Features;
import com.jarongmedia_backend.documents.Hotel;
import com.jarongmedia_backend.documents.Room;
import com.jarongmedia_backend.dto.AvailabilityDTO;
import com.jarongmedia_backend.dto.FeatureDTO;
import com.jarongmedia_backend.dto.HotelDTO;
import com.jarongmedia_backend.dto.RoomDTO;

public interface HotelService {

	public Hotel createHotel(HotelDTO hotelDTO);

	public Room createRoom(RoomDTO roomDTO);

	public Features createFeature(FeatureDTO featureDTO);

	public Room getRoom(String roomId);

	public List<Features> getFeatures();

	public List<Hotel> getHotels();

	public Hotel getHotelById(String id);

	Page<Room> getRooms(Integer pageNo, Integer pageSize);

}
