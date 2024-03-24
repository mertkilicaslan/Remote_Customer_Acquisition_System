package com.mertkilicaslan.customerSystem.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "CustomerLoginRequest", description = "Customer credentials for system login")
public class CustomerLoginRequest {
	private String email;
	private String password;
}
