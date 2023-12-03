package com.mertkilicaslan.customerSystem.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "BalanceOperationRequest", description = "Customer email and balance request")
public class BalanceOperationRequest {
    private String email;
    private Integer creditBalanceRequest;
    private Integer debitBalanceRequest;
}
