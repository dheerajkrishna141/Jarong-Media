//package com.jarongmedia_backend.serviceImpl;
//
//import java.util.HashSet;
//import java.util.Map;
//import java.util.Set;
//import java.util.UUID;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//import com.jarongmedia_backend.dto.loginMessage;
//import com.jarongmedia_backend.entities.EndUser;
//import com.jarongmedia_backend.entities.Roles;
//import com.jarongmedia_backend.exceptions.OAuth2AuthenticationException;
//import com.jarongmedia_backend.repository.EndUserRepo;
//import com.jarongmedia_backend.repository.RoleRepository;
//import com.jarongmedia_backend.service.EncryptionService;
//import com.jarongmedia_backend.service.OAuthService;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpSession;
//
//@Service
//public class OAuthServiceImpl implements OAuthService {
//	@Value("${oauth2.client.registration.google.client-id}")
//	private String clientId;
//
//	@Value("${oauth2.client.registration.google.client-secret}")
//	private String clientSecret;
//
//	@Value("${oauth2.client.registration.google.redirect-uri}")
//	private String redirect_uri;
//
//	@Autowired
//	private EndUserRepo endUserRepo;
//
//	@Autowired
//	private RoleRepository roleRepository;
//
//	@Autowired
//	private EncryptionService encryptionService;
//
//	@Autowired
//	private RestTemplate restTemplate;
//
//	@Override
//	public loginMessage OAuth2Authentication(String authCode, HttpServletRequest request) {
//
//		String tokenEndpoint = "https://oauth2.googleapis.com/token";
//		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
//		params.add("code", authCode);
//		params.add("client_id", clientId);
//		params.add("client_secret", clientSecret);
//		params.add("redirect_uri", redirect_uri);
//		params.add("grant_type", "authorization_code");
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//		System.out.println(params);
//		System.out.println(authCode);
//
//		HttpEntity<MultiValueMap<String, String>> authRequest = new HttpEntity<MultiValueMap<String, String>>(params,
//				headers);
//		loginMessage message = new loginMessage();
//
//		try {
//			System.out.println(tokenEndpoint);
//			ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenEndpoint, authRequest, Map.class);
//
//			String tokenId = (String) tokenResponse.getBody().get("id_token");
//
//			String userInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + tokenId;
//
//			ResponseEntity<Map> userInfoResponse = restTemplate.getForEntity(userInfoUrl, Map.class);
//
//			if (userInfoResponse.getStatusCode() == HttpStatus.OK) {
//				Map<String, Object> userInfo = userInfoResponse.getBody();
//				System.out.println(userInfo);
//
//				String userEmail = (String) userInfo.get("email");
//				String userFirstName = (String) userInfo.get("given_name");
//				String userLastName = (String) userInfo.get("family_name");
//
//				EndUser user = endUserRepo.findByEmail(userEmail);
//
//				Roles role = roleRepository.findByName("ROLE_ADMIN");
//				Set<Roles> userRoles = new HashSet<Roles>();
//				userRoles.add(role);
//
//				if (user == null) {
//					user = EndUser.builder().email(userEmail).emailVerified(true).firstName(userFirstName)
//							.lastName(userLastName)
//							.password(encryptionService.EncryptPassword(UUID.randomUUID().toString())).roles(userRoles)
//							.build();
//
//					user = endUserRepo.save(user);
//				}
//
//				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//						user.getEmail(), user.getPassword(), user.getRoles());
//
//				SecurityContext context = SecurityContextHolder.getContext();
//				context.setAuthentication(authenticationToken);
//
//				HttpSession session = request.getSession(true);
//				session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);
//
//				message.setEndUser(user);
//				message.setMessage("User Successfully Logged In!");
//				message.setStatus(true);
//
//			}
//
//		}
//
//		catch (Exception e) {
//			throw new OAuth2AuthenticationException(e.getMessage());
//		}
//		return message;
//
//	}
//
//}
