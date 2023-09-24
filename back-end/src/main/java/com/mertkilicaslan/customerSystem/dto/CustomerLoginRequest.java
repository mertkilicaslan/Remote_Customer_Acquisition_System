package com.mertkilicaslan.customerSystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerLoginRequest {
	String email;
	String password;
}
