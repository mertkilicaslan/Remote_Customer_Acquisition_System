package com.mertkilicaslan.customerSystem.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "CustomerRegisterResponse", description = "Success status response after a customer's sign up attempt")
public class CustomerRegisterResponse extends BaseResponse{
}
