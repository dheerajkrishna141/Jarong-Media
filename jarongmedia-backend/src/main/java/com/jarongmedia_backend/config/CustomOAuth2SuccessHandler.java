package com.jarongmedia_backend.config;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.jarongmedia_backend.entities.EndUser;
import com.jarongmedia_backend.entities.Roles;
import com.jarongmedia_backend.repository.EndUserRepo;
import com.jarongmedia_backend.repository.RoleRepository;
import com.jarongmedia_backend.service.EncryptionService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

	@Autowired
	private EndUserRepo endUserRepo;

	@Autowired
	private EncryptionService encryptionService;

	@Value("${oauth2.success-url}")
	String frontendRedirectUrl;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		// TODO Auto-generated method stub
		if (authentication.getPrincipal() instanceof DefaultOAuth2User) {
			DefaultOAuth2User userDetails = (DefaultOAuth2User) authentication.getPrincipal();
			String email = userDetails.getAttribute("email");
			String firstName = userDetails.getAttribute("given_name");
			String lastName = userDetails.getAttribute("family_name");
			String password = encryptionService.EncryptPassword("kratos");

			Roles role = roleRepository.findByName("ROLE_USER");
			Set<Roles> userRoles = new HashSet<Roles>();
			userRoles.add(role);

			EndUser user = endUserRepo.findByEmail(email);

			if (user == null) {
				user = EndUser.builder().email(email).firstName(firstName).lastName(lastName).password(password)
						.emailVerified(true).roles(userRoles).build();

				endUserRepo.save(user);
			}

			new DefaultRedirectStrategy().sendRedirect(request, response, frontendRedirectUrl);

		}

	}

}
