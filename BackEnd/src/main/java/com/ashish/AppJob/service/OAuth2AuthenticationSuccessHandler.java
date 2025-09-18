package com.ashish.AppJob.service;

import com.ashish.AppJob.entity.Role;
import com.ashish.AppJob.entity.User;
import com.ashish.AppJob.repo.UserRepo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

		@Autowired
		private JwtService jwtService ;
		@Autowired
		private UserRepo userRepo;

		@Override
		public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

				OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
				String email = oAuth2User.getAttribute("email");

				User user = userRepo.findByEmail(email)
								.orElseGet(() -> {
										User newUser = new User();
										newUser.setEmail(email);
										newUser.setRole(Role.STUDENT); // Default role for new OAuth2 users
										// You might want to generate a random password or leave it null if they only use OAuth
										newUser.setPassword("OAUTH2_USER");
										return userRepo.save(newUser);
								});

				// Generate a JWT for this user
				String token = jwtService.generateToken(user.getUsername(), user.getRole().name());

				// Redirect the user to your frontend, passing the token as a query parameter
				String redirectUrl = "http://localhost:5173/oauth2/redirect?token=" + token + "&role=" + user.getRole().name();
				response.sendRedirect(redirectUrl);
		}

}
