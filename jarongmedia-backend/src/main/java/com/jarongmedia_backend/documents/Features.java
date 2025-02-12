package com.jarongmedia_backend.documents;

import java.util.HashMap;

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
public class Features {

	@Id
	private String id;

	private HashMap<String, String> categorical_features;

	private String area;

	private String bed_type;

}
