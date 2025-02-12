package com.jarongmedia_backend.serviceImpl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.dto.DeleteMessage;
import com.jarongmedia_backend.dto.EndUserDTO;
import com.jarongmedia_backend.dto.StatusMessage;
import com.jarongmedia_backend.dto.loginMessage;
import com.jarongmedia_backend.dto.passwordDTO;
import com.jarongmedia_backend.entities.EndUser;
import com.jarongmedia_backend.entities.OTP;
import com.jarongmedia_backend.entities.Roles;
import com.jarongmedia_backend.exceptions.EntityNotFoundException;
import com.jarongmedia_backend.exceptions.EntityNotUniqueException;
import com.jarongmedia_backend.repository.EndUserRepo;
import com.jarongmedia_backend.repository.OTPRepository;
import com.jarongmedia_backend.repository.RoleRepository;
import com.jarongmedia_backend.service.EncryptionService;
import com.jarongmedia_backend.service.EndUserService;
import com.jarongmedia_backend.service.OTPService;

import jakarta.transaction.Transactional;

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

	@Autowired
	OTPService otpService;

	@Autowired
	OTPRepository otpRepository;

	@Autowired
	EmailServiceImpl emailServiceImpl;

	@Override
	public EndUser createUser(EndUserDTO dto) {
		EndUser tempUser = endUserRepo.findByEmail(dto.getEmail());

		if (tempUser != null) {
			throw new EntityNotUniqueException("User with email: " + dto.getEmail() + " already exists");
		}
		tempUser = modelmap.map(dto, EndUser.class);
		tempUser.setRoles(new HashSet<Roles>());
		tempUser.setVerificationOTP(new ArrayList<OTP>());
		tempUser.setPassword(encryptionService.EncryptPassword(dto.getPassword()));

		for (String name : dto.getRoles()) {

			Roles role = roleRepo.findByName(name);
			tempUser.getRoles().add(role);

		}
		tempUser = endUserRepo.save(tempUser);
		OTP otp = createOTP(tempUser);
		otpRepository.save(otp);

		emailServiceImpl.sendEmail(tempUser.getEmail(), otp.getOtp());
		return tempUser;
	}

	private OTP createOTP(EndUser endUser) {
		OTP otp = new OTP();
		otp.setEndUser(endUser);
		otp.setOtp(otpService.generateOTP());
		otp.setTimeStamp(new Timestamp(System.currentTimeMillis()));
		return otp;
	}

	@Override
	public loginMessage loginUser(String email) {

		EndUser user = endUserRepo.findByEmail(email);

		return new loginMessage("Login Success", true, user);

	}

	@Override
	public StatusMessage changePassword(String email, passwordDTO password) {

		StatusMessage message = new StatusMessage();
		try {
			EndUser user = endUserRepo.findByEmail(email);
			String encryptPass = encryptionService.EncryptPassword(password.getPassword());
			user.setPassword(encryptPass);
			endUserRepo.save(user);
			message.setStatus(true);
			message.setMessage("password successfully updated!");
			return message;
		} catch (EntityNotFoundException e) {
			throw new EntityNotFoundException("user not found");

		}

	}

	@Override
	public DeleteMessage deleteUser(long id) {
		DeleteMessage message = new DeleteMessage();
		EndUser user = endUserRepo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("User with Id: " + id + " is not found!"));
		endUserRepo.delete(user);
		message.setStatus(true);
		message.setMessage("User with ID: " + id + " has been deleted succesfully.");
		return message;
	}

	@Transactional
	@Override
	public StatusMessage verifyUser(long otp) {
		StatusMessage message = new StatusMessage();
		OTP userOTP = otpRepository.findByOtp(otp);
		if (userOTP != null) {
			EndUser user = userOTP.getEndUser();
			if (!user.isEmailVerified()) {
				user.setEmailVerified(true);
				endUserRepo.save(user);
				otpRepository.deleteByEndUser(user);
				message.setStatus(true);
				message.setMessage("user successfully verified!");
			} else {
				message.setStatus(false);
				message.setMessage("user already verified.");
			}
			return message;
		}

		message.setStatus(false);
		message.setMessage("OTP not valid");
		return message;
	}

}
