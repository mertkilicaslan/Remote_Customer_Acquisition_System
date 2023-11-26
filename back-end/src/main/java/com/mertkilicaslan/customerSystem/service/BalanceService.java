package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.model.Balance;
import com.mertkilicaslan.customerSystem.model.Customer;


public interface BalanceService {
    Balance createInitialBalanceForCustomer(Customer customer);
    Balance getBalanceInformationForCustomer(Customer customer);
}
