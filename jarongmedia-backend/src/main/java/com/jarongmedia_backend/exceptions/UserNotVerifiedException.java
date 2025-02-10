package com.jarongmedia_backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserNotVerifiedException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String mes;

	public UserNotVerifiedException(String mes) {
		super(mes);
		this.mes = mes;
	}

}
