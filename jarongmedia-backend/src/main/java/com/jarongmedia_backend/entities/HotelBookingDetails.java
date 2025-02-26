package com.jarongmedia_backend.entities;

import java.time.LocalDate;
import java.util.HashMap;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class HotelBookingDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private EndUser endUser;

	private ObjectId hotelId;

	private String roomId;

	private LocalDate checkInDate;

	private LocalDate checkOutDate;

	private HashMap<String, String> customerDetails;
	
	private HashMap<String, String> roomDetails;
	
	private HashMap<String, String> additionalDetails;

	private String confirmationCode;
	
	private String status;

	private double totalAmount;
	
	public String getHotelId() {
		return this.hotelId.toHexString();
	}

}
