package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.common.BalanceConstants;
import com.mertkilicaslan.customerSystem.dto.request.BalanceOperationRequest;
import com.mertkilicaslan.customerSystem.model.Balance;
import com.mertkilicaslan.customerSystem.model.Customer;
import com.mertkilicaslan.customerSystem.repository.BalanceRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class BalanceServiceImp implements BalanceService {

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
        return balanceRepository.findByCustomer(customer).orElseThrow(() -> new EntityNotFoundException(BalanceConstants.BALANCE_NOT_FOUND));
    }

    @Override
    public Balance updateBalanceInformationForCustomer(Customer customer, BalanceOperationRequest request) {
        if (request == null || request.getDebitBalanceRequest() == null || request.getCreditBalanceRequest() == null) {
            throw new IllegalArgumentException(BalanceConstants.INVALID_BALANCE_REQUEST);
        }

        Balance balance = getBalanceInformationForCustomer(customer);
        validateSufficientFunds(balance, request);

        balance.setDebitBalance(balance.getDebitBalance() + request.getDebitBalanceRequest());
        balance.setCreditBalance(balance.getCreditBalance() + request.getCreditBalanceRequest());
        return balanceRepository.save(balance);
    }

    private void validateSufficientFunds(Balance balance, BalanceOperationRequest request) {
        if (request.getDebitBalanceRequest() < 0 && balance.getDebitBalance() < Math.abs(request.getDebitBalanceRequest())) {
            throw new IllegalArgumentException(BalanceConstants.NOT_ENOUGH_DEBIT);
        }
        if (request.getCreditBalanceRequest() < 0 && balance.getCreditBalance() < Math.abs(request.getCreditBalanceRequest())) {
            throw new IllegalArgumentException(BalanceConstants.NOT_ENOUGH_CREDIT);
        }
    }


}
