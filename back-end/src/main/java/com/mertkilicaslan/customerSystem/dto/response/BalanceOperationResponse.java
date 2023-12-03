package com.mertkilicaslan.customerSystem.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "BalanceOperationResponse", description = "Updated credit balance and debit balance status")
public class BalanceOperationResponse extends BaseResponse{
    private Integer creditBalance;
    private Integer debitBalance;
}
