package com.mertkilicaslan.customerSystem.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "CustomerRegisterRequest", description = "Detailed information about a customer for system registration")
public class CustomerRegisterRequest {
	private String email;
	private String password;
	private String name;
	private String surname;
	private String birthday;
	private String tcNo;
	private String phoneNo;
	private Boolean harvestCardPreference;
}
