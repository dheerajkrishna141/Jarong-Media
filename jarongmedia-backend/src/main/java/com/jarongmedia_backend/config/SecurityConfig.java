package com.jarongmedia_backend.config;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfig {

	@Autowired
	CustomOAuth2SuccessHandler auth2SuccessHandler;

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
			auth.requestMatchers("/public/**").permitAll();
			auth.requestMatchers("/user/booking/**").authenticated();
			auth.requestMatchers("/user/delete/{id}").hasAnyRole("ADMIN");
			auth.requestMatchers("/admin/**").hasAnyRole("ADMIN");
			auth.requestMatchers("/user/register", "/user/login", "/user/verify", "/auth/**").permitAll();
			auth.anyRequest().authenticated();

		});

		http.oauth2Login(login -> {
			login.successHandler(auth2SuccessHandler);
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
