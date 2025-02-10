package com.jarongmedia_backend.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	JavaMailSender javaMailSender;

	@Override
	public void sendEmail(String to, long otp) {

		try {
			String subject = "Verify your email!";
			String body="The One Time Password (OTP) for your email verification is "+otp;
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setTo(to);
			mailMessage.setSubject(subject);
			mailMessage.setText(body);
			javaMailSender.send(mailMessage);
		} catch (Exception e) {
			throw new MailSendException(e.getMessage());
		}

	}

}
