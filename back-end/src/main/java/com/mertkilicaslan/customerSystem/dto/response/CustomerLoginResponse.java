package com.mertkilicaslan.customerSystem.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "CustomerLoginResponse", description = "Response data after a customer's login attempt, containing user details and success status")
public class CustomerLoginResponse extends BalanceOperationResponse {
	private String email;
	private String name;
	private String surname;
	private String birthday;
	private String tcNo;
	private String phoneNo;
	private Boolean harvestCardPreference;
}
