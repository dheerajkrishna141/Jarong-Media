package com.jarongmedia_backend.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
public class EndUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "First_Name")
	private String firstName;

	@Column(name = "Last_Name")
	private String lastName;

	@Column(name = "Email")
	private String email;

	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "Password")
	private String password;

	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "Date_Of_Birth")
	private Date dob;

	@JsonIgnore
	@Column(name = "email_verified")
	@Builder.Default
	private boolean emailVerified = false;

	@JsonIgnore
	@OrderBy("id desc")
	@OneToMany(mappedBy = "endUser", orphanRemoval = true)
	private List<OTP> verificationOTP = new ArrayList<OTP>();

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	@Builder.Default
	private Set<Roles> roles = new HashSet<Roles>();

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
	private Set<FlightBookingDetails> flightBookingDetails = new HashSet<FlightBookingDetails>();

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "endUser")
	private Set<HotelBookingDetails> hotelBookingDetails = new HashSet<HotelBookingDetails>();

}
