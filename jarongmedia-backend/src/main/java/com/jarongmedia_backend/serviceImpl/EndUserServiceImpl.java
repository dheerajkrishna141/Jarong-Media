package com.jarongmedia_backend.serviceImpl;

import java.util.HashSet;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.dto.DeleteMessage;
import com.jarongmedia_backend.dto.EndUserDTO;
import com.jarongmedia_backend.dto.PasswordMessage;
import com.jarongmedia_backend.dto.loginMessage;
import com.jarongmedia_backend.dto.passwordDTO;
import com.jarongmedia_backend.entities.EndUser;
import com.jarongmedia_backend.entities.Roles;
import com.jarongmedia_backend.exceptions.UserNotFoundException;
import com.jarongmedia_backend.exceptions.UserNotUniqueException;
import com.jarongmedia_backend.repository.EndUserRepo;
import com.jarongmedia_backend.repository.RoleRepository;
import com.jarongmedia_backend.service.EncryptionService;
import com.jarongmedia_backend.service.EndUserService;

@Service
public class EndUserServiceImpl implements EndUserService {

	@Autowired
	EndUserRepo endUserRepo;

	@Autowired
	ModelMapper modelmap;

	@Autowired
	EncryptionService encryptionService;

	@Autowired
	RoleRepository roleRepo;

	@Override
	public EndUser createUser(EndUserDTO dto) {
		EndUser tempUser = endUserRepo.findByEmail(dto.getEmail());

		if (tempUser != null) {
			throw new UserNotUniqueException("User with email: " + dto.getEmail() + " already exists");
		}
		tempUser = modelmap.map(dto, EndUser.class);
		tempUser.setRoles(new HashSet<Roles>());
		tempUser.setPassword(encryptionService.EncryptPassword(dto.getPassword()));

		for (String name : dto.getRoles()) {

			Roles role = roleRepo.findByName(name);
			tempUser.getRoles().add(role);

		}

		tempUser = endUserRepo.save(tempUser);
		return tempUser;
	}

	@Override
	public loginMessage loginUser(String email) {

		EndUser user = endUserRepo.findByEmail(email);

		return new loginMessage("Login Success", true, user);

	}

	@Override
	public PasswordMessage changePassword(String email, passwordDTO password) {

		PasswordMessage message = new PasswordMessage();
		try {
			EndUser user = endUserRepo.findByEmail(email);
			String encryptPass = encryptionService.EncryptPassword(password.getPassword());
			user.setPassword(encryptPass);
			endUserRepo.save(user);
			message.setStatus(true);
			message.setMessage("password successfully updated!");
			return message;
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException("user not found");

		}

	}

	@Override
	public DeleteMessage deleteUser(long id) {
		DeleteMessage message = new DeleteMessage();
		EndUser user = endUserRepo.findById(id)
				.orElseThrow(() -> new UserNotFoundException("User with Id: " + id + " is not found!"));
		endUserRepo.delete(user);
		message.setStatus(true);
		message.setMessage("User with ID: " + id + " has been deleted succesfully.");
		return message;
	}

}
