package com.mertkilicaslan.customerSystem.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "NewCustomerResponse", description = "Success status response after a customer's sign up attempt")
public class NewCustomerResponse {
	Boolean isSuccess;
}
