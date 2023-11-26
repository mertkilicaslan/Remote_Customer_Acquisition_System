package com.mertkilicaslan.customerSystem.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "CustomerRegisterRequest", description = "Detailed information about a customer for system registration")
public class CustomerRegisterRequest {
	String email;
	String password;
	String name;
	String surname;
	String birthday;
	String tcNo;
	String phoneNo;
	Boolean hasatKartPreference;
}