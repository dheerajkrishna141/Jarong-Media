package com.jarongmedia_backend.serviceImpl;

import java.math.BigDecimal;
import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.dto.HotelBookingDTO;
import com.jarongmedia_backend.dto.StripeResponse;
import com.jarongmedia_backend.exceptions.StripePaymentException;
import com.jarongmedia_backend.repository.HotelBookingRepository;
import com.jarongmedia_backend.service.StripePaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData.ProductData;
import com.stripe.param.checkout.SessionCreateParams.Mode;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class StripePaymentServiceImpl implements StripePaymentService {

	@Value("${stripe.secret.api.key}")
	private String stripeKey;

	@Value("${stripe.payment.success.url}")
	private String successUrl;

	@Value("${stripe.payment.cancel.url}")
	private String cancelUrl;
	
	@Autowired
	private HotelBookingRepository bookingRepository;
	


	@Override
	public StripeResponse makePayment(String CC) {

		Stripe.apiKey = stripeKey;
		var bookingDTO = bookingRepository.findByConfirmationCode(CC);
		ProductData productData = ProductData.builder().setName(bookingDTO.getRoomId())
				.setDescription("Room booking for room: "+bookingDTO.getRoomId()).build();

		PriceData priceData = PriceData.builder().setCurrency("USD")
				.setUnitAmountDecimal(BigDecimal.valueOf(bookingDTO.getTotalAmount() * 100) ).setProductData(productData).build();
		
		LineItem lineItem = LineItem.builder().setPriceData(priceData).setQuantity(1L).build();

		SessionCreateParams createParams = SessionCreateParams.builder().addLineItem(lineItem).setMode(Mode.PAYMENT)
				.setSuccessUrl(successUrl+"?session_id={CHECKOUT_SESSION_ID}").setCancelUrl(cancelUrl)
				.putMetadata("confirmation_code", bookingDTO.getConfirmationCode())
				.build();


		try {
			Session session = Session.create(createParams);

			return StripeResponse.builder().status("SUCCESS").message("Payment session created")
					.sessionId(session.getId()).sessionUrl(session.getUrl()).build();
		} catch (StripeException e) {
			throw new StripePaymentException(e.getMessage());
		}

	}
	
	
	public String getBookingConfirmationCode(String sessionId) {
		
		Stripe.apiKey= stripeKey;
		try {
			Session session = Session.retrieve(sessionId);
			return session.getMetadata().get("confirmation_code");
			
		}
		catch(StripeException e) {
			throw new EntityNotFoundException(e.getMessage());
		}
	}
	
	


}
