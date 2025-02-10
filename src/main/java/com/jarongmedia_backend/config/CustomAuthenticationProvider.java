package com.jarongmedia_backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.jarongmedia_backend.entities.EndUser;
import com.jarongmedia_backend.repository.EndUserRepo;

@Configuration
public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private EndUserRepo userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		// TODO Auto-generated method stub
		String email = authentication.getName();
		String password = authentication.getCredentials().toString();

		EndUser user = userRepo.findByEmail(email);

		if (user != null) {
			if (passwordEncoder.matches(password, user.getPassword())) {
				return new UsernamePasswordAuthenticationToken(email, password, user.getRoles());
			} else {
				throw new BadCredentialsException("Invalid Password!");
			}
		} else {
			throw new UsernameNotFoundException("User with username: " + email + " not found!");
		}

	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}

}
