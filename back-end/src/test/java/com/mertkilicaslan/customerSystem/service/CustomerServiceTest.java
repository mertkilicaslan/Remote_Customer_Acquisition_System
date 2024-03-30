package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.dto.request.BalanceOperationRequest;
import com.mertkilicaslan.customerSystem.dto.request.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.response.BalanceOperationResponse;
import com.mertkilicaslan.customerSystem.dto.response.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.request.CustomerRegisterRequest;
import com.mertkilicaslan.customerSystem.dto.response.CustomerRegisterResponse;
import com.mertkilicaslan.customerSystem.model.Balance;
import com.mertkilicaslan.customerSystem.model.Customer;
import com.mertkilicaslan.customerSystem.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    @InjectMocks
    CustomerServiceImp service;
    @Mock
    CustomerRepository repository;
    @Mock
    BalanceService balanceService;

    @Test
    void createNewCustomerSuccessfully_WhenRegisteredCredentialValid() {
        CustomerRegisterRequest request = validCustomerRegisterRequest();
        when(repository.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(repository.save(any(Customer.class))).thenReturn(new Customer());
        when(balanceService.createInitialBalanceForCustomer(any(Customer.class))).thenReturn(new Balance());

        CustomerRegisterResponse response = service.createNewCustomer(request);

        assertTrue(response.getIsSuccess());
        verify(repository).save(any(Customer.class));
    }

    @Test
    void createNewCustomerShouldThrowError_WhenRegisteredCredentialInvalid() {
        CustomerRegisterRequest request = validCustomerRegisterRequest();
        request.setEmail(null);

        assertThrows(IllegalArgumentException.class, () -> service.createNewCustomer(request));
    }

    @Test
    void createNewCustomerShouldThrowError_WhenRegisteredEmailExists() {
        CustomerRegisterRequest request = validCustomerRegisterRequest();
        when(repository.findByEmail(request.getEmail())).thenReturn(Optional.of(new Customer()));

        assertThrows(DataIntegrityViolationException.class, () -> service.createNewCustomer(request));
    }

    @Test
    void getCustomerInformationSuccessfully_WhenLoginCredentialCorrect() {
        CustomerLoginRequest request = validCustomerLoginRequest();
        Customer mockCustomer = new Customer();
        mockCustomer.setEmail("mert@mert.com");

        when(repository.findByEmailAndPassword(request.getEmail(), request.getPassword())).thenReturn(Optional.of(mockCustomer));
        when(balanceService.getBalanceInformationForCustomer(any(Customer.class))).thenReturn(validBalanceInformation());

        CustomerLoginResponse response = service.getCustomerInformation(request);

        assertTrue(response.getIsSuccess());
        assertEquals(request.getEmail(), response.getEmail());
        assertEquals(100, response.getDebitBalance());
    }

    @Test
    void getCustomerInformationShouldThrowError_WhenPassOrEmailInvalid() {
        CustomerLoginRequest request = validCustomerLoginRequest();
        request.setPassword(null);

        assertThrows(IllegalArgumentException.class, () -> service.getCustomerInformation(request));
    }

    @Test
    void getCustomerInformationShouldThrowError_WhenPassEmailCombinationDoesNotExist() {
        CustomerLoginRequest request = validCustomerLoginRequest();
        when(repository.findByEmailAndPassword(request.getEmail(), request.getPassword())).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.getCustomerInformation(request));
    }

    @Test
    void updateCustomerBalance_WhenValidBalanceOperationRequest() {
        BalanceOperationRequest request = validBalanceOperationRequest();

        when(repository.findByEmail(request.getEmail())).thenReturn(Optional.of(new Customer()));
        when(balanceService.updateBalanceInformationForCustomer(any(Customer.class), any(BalanceOperationRequest.class))).thenReturn(validBalanceInformation());

        BalanceOperationResponse response = service.updateCustomerBalance(request);
        assertTrue(response.getIsSuccess());
        assertEquals(100, response.getCreditBalance());
    }

    @Test
    void updateCustomerBalance_WhenEmailIsInvalid() {
        BalanceOperationRequest request = validBalanceOperationRequest();
        request.setEmail(null);

        assertThrows(IllegalArgumentException.class, () -> service.updateCustomerBalance(request));
    }

    private CustomerRegisterRequest validCustomerRegisterRequest() {
        CustomerRegisterRequest request = new CustomerRegisterRequest();
        request.setName("Mert");
        request.setSurname("Kilicaslan");
        request.setEmail("mert@mert.com");
        request.setPassword("Password?987");
        request.setBirthday("2000-01-01");
        request.setPhoneNo("05123456789");
        request.setTcNo("12345678900");
        request.setHarvestCardPreference(true);
        return request;
    }

    private CustomerLoginRequest validCustomerLoginRequest() {
        CustomerLoginRequest request = new CustomerLoginRequest();
        request.setEmail("mert@mert.com");
        request.setPassword("Password?987");
        return request;
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
