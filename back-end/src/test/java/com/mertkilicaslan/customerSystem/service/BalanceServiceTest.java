package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.repository.BalanceRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class BalanceServiceTest {

    @InjectMocks
    BalanceServiceImp service;

    @Mock
    BalanceRepository repository;

    @Test
    void createInitialBalanceForCustomer() {
    }

    @Test
    void getBalanceInformationForCustomer() {
    }
}