// Create this file in src/main/java/com/ashish/AppJob/Dto/JwtResponse.java
package com.ashish.AppJob.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
		// Add Getters and Setters
		private String token;
		private String type = "Bearer";
		private String role ;

		public JwtResponse(String accessToken , String role) {
				this.token = accessToken;
				this.role = role ;
		}

}