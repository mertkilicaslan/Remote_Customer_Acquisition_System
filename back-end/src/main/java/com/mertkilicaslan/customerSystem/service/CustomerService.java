package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.CustomerRegisterRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerRegisterResponse;

public interface CustomerService {
	
     CustomerRegisterResponse createNewCustomer(CustomerRegisterRequest request);
     
     CustomerLoginResponse getCustomerInformation(CustomerLoginRequest request);
}
