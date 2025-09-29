package com.ashish.AppJob.controller;

import com.ashish.AppJob.Dto.JwtResponse;
import com.ashish.AppJob.Dto.LoginRequest;
import com.ashish.AppJob.Dto.RegisterRequest;
import com.ashish.AppJob.entity.User;
import com.ashish.AppJob.repo.UserRepo;
import com.ashish.AppJob.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

		@Autowired
		private AuthenticationManager authenticationManager;
		@Autowired
		private PasswordEncoder passwordEncoder;
		@Autowired
		private UserRepo userRepo;
		@Autowired
		private JwtService jwtService;

		@PostMapping("/register")
		public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
				if (userRepo.findByEmail(registerRequest.getEmail()).isPresent()) {
						return ResponseEntity.badRequest().body("Error: Email is already in use!");
				}

				User user = new User();
				user.setEmail(registerRequest.getEmail());
				user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
				user.setRole(registerRequest.getRole());

				userRepo.save(user);
				return ResponseEntity.ok("User registered successfully!");
		}

		@PostMapping("/login")
		public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
				// Authenticate the user's credentials
				Authentication authentication = authenticationManager.authenticate(
								new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

				// If authentication is successful, generate the JWT
				if (authentication.isAuthenticated()) {
						User user = userRepo.findByEmail(loginRequest.getEmail()).get();
						// FIX: Call generateToken with the correct parameters: email and role
						String jwt = jwtService.generateToken(user.getUsername(), user.getRole().name());
						return ResponseEntity.ok(new JwtResponse(jwt , user.getRole().name()));
				} else {
						throw new UsernameNotFoundException("Invalid user request!");
				}
		}
}