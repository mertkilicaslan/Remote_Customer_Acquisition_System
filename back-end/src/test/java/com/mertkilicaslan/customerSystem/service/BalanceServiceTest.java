package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.dto.request.BalanceOperationRequest;
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
import static org.junit.jupiter.api.Assertions.assertThrows;
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

    @Test
    void updateBalanceInformationForCustomer_WhenSufficientFunds() {
        Balance expectedBalance = validBalanceInformation();
        BalanceOperationRequest request = validBalanceOperationRequest();

        when(repository.findByCustomer(any(Customer.class))).thenReturn(Optional.of(expectedBalance));
        when(repository.save(any(Balance.class))).thenReturn(expectedBalance);

        Balance actualBalance = service.updateBalanceInformationForCustomer(new Customer(), request);

        assertEquals(expectedBalance.getCreditBalance(), actualBalance.getCreditBalance());
        assertEquals(expectedBalance.getDebitBalance(), actualBalance.getDebitBalance());
        verify(repository).save(any(Balance.class));
    }

    @Test
    void givenInvalidOperationRequest_whenUpdateBalanceInformationForCustomer_ShouldThrowException() {
        BalanceOperationRequest request = validBalanceOperationRequest();
        request.setDebitBalanceRequest(null);

        assertThrows(IllegalArgumentException.class, () -> service.updateBalanceInformationForCustomer(new Customer(), request));
    }

    @Test
    void givenInsufficientDebit_whenUpdateBalanceInformationForCustomer_ShouldThrowException() {
        Balance expectedBalance = validBalanceInformation();
        BalanceOperationRequest request = validBalanceOperationRequest();
        request.setDebitBalanceRequest(-200);
        when(repository.findByCustomer(any(Customer.class))).thenReturn(Optional.of(expectedBalance));

        assertThrows(IllegalArgumentException.class, () -> service.updateBalanceInformationForCustomer(new Customer(), request));
    }

    @Test
    void givenInsufficientCredit_whenUpdateBalanceInformationForCustomer_ShouldThrowException() {
        Balance expectedBalance = validBalanceInformation();
        BalanceOperationRequest request = validBalanceOperationRequest();
        request.setCreditBalanceRequest(-200);
        when(repository.findByCustomer(any(Customer.class))).thenReturn(Optional.of(expectedBalance));

        assertThrows(IllegalArgumentException.class, () -> service.updateBalanceInformationForCustomer(new Customer(), request));
    }

    private Balance validBalanceInformation() {
        Balance balance = new Balance();
        balance.setCreditBalance(100);
        balance.setDebitBalance(100);
        return balance;
    }

    private BalanceOperationRequest validBalanceOperationRequest() {
        BalanceOperationRequest balanceOperationReq = new BalanceOperationRequest();
        balanceOperationReq.setEmail("mert@mert.com");
        balanceOperationReq.setCreditBalanceRequest(-40);
        balanceOperationReq.setDebitBalanceRequest(20);
        return balanceOperationReq;
    }
}