package com.jarongmedia_backend.dto;

import java.util.List;

import org.bson.types.ObjectId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoomDTO {

	private String id;
	private String category;
	private List<String> features;
	private ObjectId hotelId;
	private double pricePerNight;
	private String capacity;

}
