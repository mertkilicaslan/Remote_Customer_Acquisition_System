package com.mertkilicaslan.customerSystem.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "CustomerLoginResponse", description = "Response data after a customer's login attempt, containing user details and success status")
public class CustomerLoginResponse extends BalanceOperationResponse {
	String email;
	String name;
	String surname;
	String birthday;
	String tcNo;
	String phoneNo;
	Boolean hasatKartPreference;
}
