package com.jarongmedia_backend.documents;

import java.time.LocalDate;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
public class Availability {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private ObjectId id;

	private String roomId;

	private ObjectId hotelId;

	private LocalDate checkInDate;

	private LocalDate checkOutDate;

	private String status;

	public String getId() {
		return this.id.toHexString();
	}

	public String getHotelId() {
		return this.hotelId.toHexString();
	}

}
