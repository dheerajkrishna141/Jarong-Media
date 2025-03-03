package com.jarongmedia_backend.serviceImpl;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.entities.HotelBookingDetails;
import com.jarongmedia_backend.service.EmailService;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	JavaMailSender javaMailSender;

	@Override
	public void sendVerificationEmail(String to, long otp) {

		try {
			String subject = "Verify your email!";
			String body = "The One Time Password (OTP) for your email verification is " + otp;
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setTo(to);
			mailMessage.setSubject(subject);
			mailMessage.setText(body);
			javaMailSender.send(mailMessage);
		} catch (Exception e) {
			throw new MailSendException(e.getMessage());
		}

	}

	@Override
	public void sendBookingConfirmationEmail(HotelBookingDetails dto) {

		try {
			String subject = "Booking Confirmation";

			String body = "<h1>Booking Confirmation</h1>" + "<p>Dear " + dto.getCustomerDetails().get("first_name")
					+ ",</p>" + "<p>Thank you for your booking! Here are your details:</p>"
					+ "<p><strong>Room ID:</strong> " + dto.getRoomId() + "</p>" + "<p><strong>Check-In Date:</strong> "
					+ dto.getCheckInDate() + "</p>" + "<p><strong>Check-Out Date:</strong> " + dto.getCheckOutDate()
					+ "</p>" + "<p><strong>Confirmation Code:</strong> " + dto.getConfirmationCode() + "</p>"
					+ "<p><strong>Status:</strong> " + dto.getStatus() + "</p>" + "<h2>Customer Details:</h2>" + "<ul>"
					+ dto.getCustomerDetails().entrySet().stream()
							.map(entry -> "<li><strong>" + entry.getKey() + ":</strong> " + entry.getValue() + "</li>")
							.collect(Collectors.joining())
					+ "</ul>" + "<h2>Room Details:</h2>" + "<ul>"
					+ dto.getRoomDetails().entrySet().stream()
							.map(entry -> "<li><strong>" + entry.getKey() + ":</strong> " + entry.getValue() + "</li>")
							.collect(Collectors.joining())
					+ "</ul>" + "<h2>Additional Details:</h2>" + "<ul>"
					+ dto.getAdditionalDetails().entrySet().stream()
							.map(entry -> "<li><strong>" + entry.getKey() + ":</strong> " + entry.getValue() + "</li>")
							.collect(Collectors.joining())
					+ "</ul>" + "<p><strong>Total Amount:</strong> $" + dto.getTotalAmount() + "</p>"
					+ "<p>We look forward to your stay!</p>";

			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
			helper.setTo(dto.getEndUser().getEmail());
			helper.setSubject(subject);
			helper.setText(body, true); // true indicates the body is HTML

			javaMailSender.send(mimeMessage);
		} catch (Exception e) {
			throw new MailSendException(e.getMessage());

		}

	}

}
