package com.jarongmedia_backend.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
public class FlightBookingDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "booking_id")
	private long id;
		
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private EndUser user;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "passenger_booking", joinColumns = @JoinColumn(name="booking_id"), inverseJoinColumns = @JoinColumn(name="passenger_id"))
	private Set<Passengers> passengers = new HashSet<Passengers>();
	private String flight_number;
	private String departure_airport;
	private String arrival_airport;
	private String departure_time;
	private String arrival_time;
	private String cabin_class;
	private Double price;
	private Date booking_date;
	private Double total_amount;
}
