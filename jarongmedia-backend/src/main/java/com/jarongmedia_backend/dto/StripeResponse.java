package com.jarongmedia_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class StripeResponse {
	
	private String status;
	private String message;
	private String sessionId;
	private String sessionUrl;

}
