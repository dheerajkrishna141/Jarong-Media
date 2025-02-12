package com.jarongmedia_backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EntityNotUniqueException extends RuntimeException{
	private String mes;
	public EntityNotUniqueException(String mes) {
		super(mes);
		this.mes = mes;
	}

}
