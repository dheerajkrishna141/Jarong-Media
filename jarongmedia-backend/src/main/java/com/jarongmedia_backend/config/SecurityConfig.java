package com.jarongmedia_backend.config;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfig {

	@Autowired
	AuthenticationEntryPoint authEntry;

	@Autowired
	CustomLogoutHandler logoutHandler;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable());
		http.cors(cors -> cors.configurationSource(request -> {
			CorsConfiguration config = new CorsConfiguration();
			config.setAllowedOriginPatterns(Collections.singletonList("*"));
			config.setAllowedMethods(Collections.singletonList("*"));
			config.setAllowedHeaders(Collections.singletonList("*"));
			config.setAllowCredentials(true);
			return config;
		}));

		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers("/user/register", "/user/login").permitAll();
			auth.requestMatchers("/user/delete/{id}").hasAnyRole("ADMIN");
			auth.anyRequest().authenticated();

		});

		http.httpBasic(login -> {
			login.authenticationEntryPoint(authEntry);
		});

		http.logout(logout -> {
			logout.logoutSuccessUrl("/login?logout=true");
			logout.logoutSuccessHandler(logoutHandler);
			logout.invalidateHttpSession(true);
		});
		http.sessionManagement(session -> {
			session.maximumSessions(2);
			session.invalidSessionUrl("/login");

		});
		return http.build();
	}

}

