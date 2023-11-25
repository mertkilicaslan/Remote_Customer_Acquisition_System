package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.CustomerRegisterRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerRegisterResponse;
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
class CustomerServiceImpTest {

	@Mock
	CustomerRepository customerRepository;

	@InjectMocks
	CustomerServiceImp service;

	@Test
	public void createNewCustomerSuccessfully_WhenRegisteredCredentialValid() {
		CustomerRegisterRequest request = validCustomerRegisterRequest();
		when(customerRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());

		CustomerRegisterResponse response = service.createNewCustomer(request);

		assertTrue(response.getIsSuccess());
		verify(customerRepository).save(any(Customer.class));
	}

    @Test
    public void createNewCustomerShouldThrowError_WhenRegisteredCredentialInvalid(){
        CustomerRegisterRequest request = validCustomerRegisterRequest();
        request.setEmail(null);

        assertThrows(IllegalArgumentException.class, () -> service.createNewCustomer(request));
    }

    @Test
    public void createNewCustomerShouldThrowError_WhenRegisteredEmailExists(){
        CustomerRegisterRequest request = validCustomerRegisterRequest();
        when(customerRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(new Customer()));

        assertThrows(DataIntegrityViolationException.class, () -> service.createNewCustomer(request));
    }

    @Test
    public void getCustomerInformationSuccessfully_WhenLoginCredentialCorrect() {
        CustomerLoginRequest request = validCustomerLoginRequest();
        Customer mockCustomer = new Customer();

        when(customerRepository.findByEmailAndPassword(request.getEmail(), request.getPassword()))
                .thenReturn(Optional.of(mockCustomer));

        CustomerLoginResponse response = service.getCustomerInformation(request);

        assertTrue(response.getIsSuccess());
        assertNotNull(response);
    }

    @Test
    public void getCustomerInformationShouldThrowError_WhenPassOrEmailInvalid(){
        CustomerLoginRequest request = validCustomerLoginRequest();
        request.setPassword(null);

        assertThrows(IllegalArgumentException.class, () -> service.getCustomerInformation(request));
    }

    @Test
    public void getCustomerInformationShouldThrowError_WhenPassEmailCombinationDoesNotExist(){
        CustomerLoginRequest request = validCustomerLoginRequest();
        when(customerRepository.findByEmailAndPassword(request.getEmail(), request.getPassword()))
                .thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.getCustomerInformation(request));
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
		request.setHasatKartPreference(true);
		return request;
	}

	private CustomerLoginRequest validCustomerLoginRequest() {
		CustomerLoginRequest request = new CustomerLoginRequest();
		request.setEmail("mert@mert.com");
		request.setPassword("Password?987");
		return request;
	}

}
