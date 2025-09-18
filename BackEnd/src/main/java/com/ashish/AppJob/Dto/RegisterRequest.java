package com.ashish.AppJob.Dto;

import com.ashish.AppJob.entity.Role;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class RegisterRequest {
		private String email ;
		private String password;
		private Role role;
}
