package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.model.Balance;
import com.mertkilicaslan.customerSystem.model.Customer;
import com.mertkilicaslan.customerSystem.repository.BalanceRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BalanceServiceTest {

    @InjectMocks
    BalanceServiceImp service;
    @Mock
    BalanceRepository repository;

    @Test
    void createInitialBalanceForCustomer_WhenCustomerRegistered() {
        Balance expectedBalance = validBalanceInformation();
        when(repository.save(any(Balance.class))).thenReturn(expectedBalance);

        Balance actualBalance = service.createInitialBalanceForCustomer(new Customer());

        assertEquals(expectedBalance.getCreditBalance(), actualBalance.getCreditBalance());
        assertEquals(expectedBalance.getDebitBalance(), actualBalance.getDebitBalance());
        verify(repository).save(any(Balance.class));

    }

    @Test
    void getBalanceInformationForCustomer() {
        Balance expectedBalance = validBalanceInformation();
        when(repository.findByCustomer(any(Customer.class))).thenReturn(Optional.of(expectedBalance));

        Balance actualBalance = service.getBalanceInformationForCustomer(new Customer());

        assertEquals(expectedBalance.getCreditBalance(), actualBalance.getCreditBalance());
        assertEquals(expectedBalance.getDebitBalance(), actualBalance.getDebitBalance());
        verify(repository).findByCustomer(any(Customer.class));

    }

    private Balance validBalanceInformation() {
        Balance balance = new Balance();
        balance.setCreditBalance(100);
        balance.setDebitBalance(100);
        return balance;
    }
}