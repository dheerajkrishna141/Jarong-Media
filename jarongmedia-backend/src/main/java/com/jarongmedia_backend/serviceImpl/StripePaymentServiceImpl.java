package com.jarongmedia_backend.serviceImpl;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.dto.HotelBookingDTO;
import com.jarongmedia_backend.dto.StripeResponse;
import com.jarongmedia_backend.exceptions.StripePaymentException;
import com.jarongmedia_backend.service.StripePaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData.ProductData;
import com.stripe.param.checkout.SessionCreateParams.Mode;

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

	@Override
	public StripeResponse makePayment(HotelBookingDTO bookingDTO) {

		Stripe.apiKey = stripeKey;
		ProductData productData = ProductData.builder().setName(bookingDTO.getRoomId())
				.setDescription(bookingDTO.toString()).build();

		PriceData priceData = PriceData.builder().setCurrency("USD")
				.setUnitAmountDecimal(BigDecimal.valueOf(bookingDTO.getTotalAmount() * 100) ).setProductData(productData).build();
		
		LineItem lineItem = LineItem.builder().setPriceData(priceData).setQuantity(1L).build();

		SessionCreateParams createParams = SessionCreateParams.builder().addLineItem(lineItem).setMode(Mode.PAYMENT)
				.setSuccessUrl(successUrl).setCancelUrl(cancelUrl).build();
		log.debug(priceData.getProductData().getName());
		log.debug(lineItem.getPriceData().toString());

		try {
			Session session = Session.create(createParams);

			return StripeResponse.builder().status("SUCCESS").message("Payment session created")
					.sessionId(session.getId()).sessionUrl(session.getUrl()).build();
		} catch (StripeException e) {
			throw new StripePaymentException(e.getMessage());
		}

	}

}
