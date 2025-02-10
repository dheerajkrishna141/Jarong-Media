package com.jarongmedia_backend.entities;

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class OTP {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "OTP_id")
	private long id;

	private long otp;
	private Timestamp timeStamp;

	@ManyToOne(optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private EndUser endUser;

}
