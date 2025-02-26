package com.jarongmedia_backend.dto;

import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HotelDTO {

	private String name;
	private String description;
	private HashMap<String, String> address;
	private HashMap<String, String> amenities;
	private HashMap<String, String> gallery;

}
