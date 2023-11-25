package com.mertkilicaslan.customerSystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse {
    Boolean isSuccess;
    String responseMessage;
}
