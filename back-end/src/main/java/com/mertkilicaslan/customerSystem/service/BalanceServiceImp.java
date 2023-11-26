package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.model.Balance;
import com.mertkilicaslan.customerSystem.model.Customer;
import com.mertkilicaslan.customerSystem.repository.BalanceRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class BalanceServiceImp implements BalanceService{

    private final BalanceRepository balanceRepository;

    public BalanceServiceImp(BalanceRepository balanceRepository) {
        this.balanceRepository = balanceRepository;
    }

    @Override
    public Balance createInitialBalanceForCustomer(Customer customer) {
        Balance balance = new Balance();
        balance.setCreditBalance(0);
        balance.setDebitBalance(0);
        balance.setCustomer(customer);
        return balanceRepository.save(balance);
    }

    @Override
    public Balance getBalanceInformationForCustomer(Customer customer) {
        return balanceRepository.findByCustomer(customer).orElseThrow(() -> new EntityNotFoundException("Balance not found for customer"));
    }

}
