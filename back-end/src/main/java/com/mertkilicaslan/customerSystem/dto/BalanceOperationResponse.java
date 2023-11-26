package com.mertkilicaslan.customerSystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BalanceOperationResponse extends BaseResponse{
    Integer creditBalance;
    Integer debitBalance;
}
