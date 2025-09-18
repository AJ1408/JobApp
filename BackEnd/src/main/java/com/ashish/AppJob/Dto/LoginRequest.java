package com.ashish.AppJob.Dto;

import com.ashish.AppJob.entity.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Data
@Getter
@Setter
public class LoginRequest {
		private String email ;
		private String password ;
}
