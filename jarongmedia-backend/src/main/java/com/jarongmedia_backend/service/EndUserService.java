package com.jarongmedia_backend.service;

import com.jarongmedia_backend.dto.DeleteMessage;
import com.jarongmedia_backend.dto.EndUserDTO;
import com.jarongmedia_backend.dto.StatusMessage;
import com.jarongmedia_backend.dto.loginMessage;
import com.jarongmedia_backend.dto.passwordDTO;
import com.jarongmedia_backend.entities.EndUser;

public interface EndUserService {
	
	public EndUser createUser(EndUserDTO dto);

	public loginMessage loginUser(String name);

	public StatusMessage changePassword(String name, passwordDTO password);

	public StatusMessage verifyUser(long otp);
	
	public DeleteMessage deleteUser(long id);
	

}
