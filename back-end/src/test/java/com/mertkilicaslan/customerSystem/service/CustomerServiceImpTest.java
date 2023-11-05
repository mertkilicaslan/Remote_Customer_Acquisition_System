package com.mertkilicaslan.customerSystem.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.NewCustomerRequest;
import com.mertkilicaslan.customerSystem.dto.NewCustomerResponse;
import com.mertkilicaslan.customerSystem.model.Customer;
import com.mertkilicaslan.customerSystem.repository.CustomerRepository;

@ExtendWith(MockitoExtension.class)
class CustomerServiceImpTest {

	@Mock
	CustomerRepository customerRepository;

	@InjectMocks
	CustomerServiceImp service;

	@Test
	public void shouldCreateNewCustomerSuccessfully() {
		// Arrange
		NewCustomerRequest request = validCustomerRequest();
		when(customerRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());

		// Act
		NewCustomerResponse response = service.createNewCustomer(request);

		// Assert
		assertTrue(response.getIsSuccess());
		verify(customerRepository).save(any(Customer.class));
	}

	@Test
	public void shouldReturnCustomerInformation_WhenCredentialsAreCorrect() {
		// Arrange
		CustomerLoginRequest request = validCustomerLoginRequest();
		Customer mockCustomer = new Customer();

		when(customerRepository.findByEmailAndPassword(request.getEmail(), request.getPassword()))
				.thenReturn(Optional.of(mockCustomer));

		// Act
		CustomerLoginResponse response = service.getCustomerInformation(request);

		// Assert
		assertTrue(response.getIsSuccess());
		assertNotNull(response);
	}

	private NewCustomerRequest validCustomerRequest() {
		NewCustomerRequest request = new NewCustomerRequest();
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
