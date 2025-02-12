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
public class Hotel {

	@Id
	private ObjectId id;

	private String name;

	private HashMap<String, String> address;

	@DBRef
	private Rating rating;

	@DBRef
	private List<Review> reviews = new ArrayList<Review>();

	@DBRef
	private Set<Room> rooms = new HashSet<Room>();

	private HashMap<String, String> amenities;

	private HashMap<String, String> gallery;

}
