package com.ashish.AppJob.config;

import com.ashish.AppJob.service.JwtService;
import com.ashish.AppJob.service.MyUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

		@Autowired
		private JwtService jwtService;

		@Autowired
		private MyUserDetailsService userDetailsService;

		@Override
		protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
						throws ServletException, IOException {

				// 1. Get the Authorization header from the request
				String authHeader = request.getHeader("Authorization");
				String token = null;
				String userEmail = null;

				// 2. Check if the header contains a Bearer token
				if (authHeader != null && authHeader.startsWith("Bearer ")) {
						token = authHeader.substring(7); // Extract the token string
						userEmail = jwtService.extractEmail(token); // Use JwtService to get the email
				}

				// 3. If a token is found and the user is not already authenticated
				if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

						// Load user details from the database
						UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

						// 4. Validate the token against the user details
						if (jwtService.validateToken(token, userDetails.getUsername())) {

								// 5. If the token is valid, set the user in the Security Context
								UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
												userDetails, null, userDetails.getAuthorities());
								authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
								SecurityContextHolder.getContext().setAuthentication(authToken);
						}
				}

				// Continue the filter chain
				filterChain.doFilter(request, response);
		}
}