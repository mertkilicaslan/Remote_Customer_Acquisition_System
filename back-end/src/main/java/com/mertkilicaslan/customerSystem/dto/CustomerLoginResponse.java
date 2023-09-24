package com.mertkilicaslan.customerSystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerLoginResponse {
	String email;
	String password;
	String name;
	String surname;
	String birthday;
	String tcNo;
	String phoneNo;
	String hasatKart;

	String message;
}
