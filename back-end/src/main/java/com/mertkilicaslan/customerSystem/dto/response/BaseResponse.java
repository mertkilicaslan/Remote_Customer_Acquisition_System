package com.mertkilicaslan.customerSystem.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse {
    private Boolean isSuccess;
    private String responseMessage;
}
