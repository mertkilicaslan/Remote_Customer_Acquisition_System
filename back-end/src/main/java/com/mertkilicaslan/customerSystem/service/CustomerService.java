package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.model.Customer;

public interface CustomerService {
     Customer saveCustomer(Customer customer);
     Customer getCustomer(String email, String password);
}
