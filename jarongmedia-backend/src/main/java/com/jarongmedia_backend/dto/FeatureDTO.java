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
public class FeatureDTO {
	private String id;
	private String room_id;
	private HashMap<String, String> categorical_features;
	private String area;
	private String bed_type;

}
