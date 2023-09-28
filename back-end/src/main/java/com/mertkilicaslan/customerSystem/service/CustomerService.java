package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.NewCustomerRequest;
import com.mertkilicaslan.customerSystem.dto.NewCustomerResponse;

public interface CustomerService {
	
     NewCustomerResponse createNewCustomer(NewCustomerRequest request);
     
     CustomerLoginResponse getCustomerInformation(CustomerLoginRequest request);
}
