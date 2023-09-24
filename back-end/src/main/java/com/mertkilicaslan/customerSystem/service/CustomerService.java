package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.dto.CreateCustomerRequest;
import com.mertkilicaslan.customerSystem.dto.CreateCustomerResponse;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;

public interface CustomerService {
	
     CreateCustomerResponse createNewCustomer(CreateCustomerRequest request);
     
     CustomerLoginResponse getCustomerInformation(CustomerLoginRequest request);
}
