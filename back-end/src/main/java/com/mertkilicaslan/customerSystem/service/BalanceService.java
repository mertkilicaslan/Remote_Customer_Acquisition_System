package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.dto.request.BalanceOperationRequest;
import com.mertkilicaslan.customerSystem.model.Balance;
import com.mertkilicaslan.customerSystem.model.Customer;


public interface BalanceService {
    Balance createInitialBalanceForCustomer(Customer customer);
    Balance getBalanceInformationForCustomer(Customer customer);
    Balance updateBalanceInformationForCustomer(Customer customer, BalanceOperationRequest request);
}
