package com.jarongmedia_backend.documents;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document
public class Room {

	@Id
	private String id;

	private String category;

	@DBRef
	private List<Features> features = new ArrayList<Features>();

	private ObjectId hotelId;

	@DBRef
	private Set<Availability> availability = new HashSet<Availability>();

	private double pricePerNight;

	private HashMap<String, String> gallery;

	private String capacity;

}
