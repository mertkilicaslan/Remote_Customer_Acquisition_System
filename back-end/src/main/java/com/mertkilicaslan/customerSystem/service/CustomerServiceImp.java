package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.common.CustomerConstants;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.NewCustomerRequest;
import com.mertkilicaslan.customerSystem.dto.NewCustomerResponse;
import com.mertkilicaslan.customerSystem.mapper.CustomerMapper;
import com.mertkilicaslan.customerSystem.model.Customer;
import com.mertkilicaslan.customerSystem.repository.CustomerRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CustomerServiceImp implements CustomerService {

	private final CustomerRepository customerRepository;

	public CustomerServiceImp(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	@Override
	public NewCustomerResponse createNewCustomer(NewCustomerRequest request) {
		if (!isValidCustomerInformation(request)) {
			throw new IllegalArgumentException(CustomerConstants.CUSTOMER_CREDENTIALS_INVALID);
		}
		
		customerRepository.findByEmail(request.getEmail()).ifPresent(c -> {
			throw new DataIntegrityViolationException(CustomerConstants.CUSTOMER_ALREADY_EXIST + c.getEmail());
		});

		customerRepository.save(CustomerMapper.toEntity(request));

		NewCustomerResponse response = new NewCustomerResponse();
		response.setIsSuccess(true);
		return response;
	}

	@Override
	public CustomerLoginResponse getCustomerInformation(CustomerLoginRequest request) {
		if (!isValidEmailFormat(request.getEmail()) || !isValidPasswordFormat(request.getPassword())) {
			throw new IllegalArgumentException(CustomerConstants.EMAIL_PASSWORD_INVALID);
		}

		Customer customer = customerRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new NoSuchElementException(CustomerConstants.EMAIL_PASSWORD_INCORRECT));

		CustomerLoginResponse response = CustomerMapper.entityToResponse(customer);
		response.setIsSuccess(true);
		return response;
	}

	private boolean isValidCustomerInformation(NewCustomerRequest request) {
		if (!isValidEmailFormat(request.getEmail()) || !isValidPasswordFormat(request.getPassword())) {
			return false;
		}
		return request.getName() != null && !request.getName().isBlank() && request.getSurname() != null
				&& !request.getSurname().isBlank() && request.getBirthday() != null && !request.getBirthday().isBlank()
				&& request.getTcNo() != null && !request.getTcNo().isBlank() && request.getPhoneNo() != null
				&& !request.getPhoneNo().isBlank() && request.getHasatKartPreference() != null;
	}

	private boolean isValidEmailFormat(String email) {
		return email != null && !email.isBlank() && email.matches(CustomerConstants.EMAIL_REGEX);
	}

	private boolean isValidPasswordFormat(String password) {
		return password != null && !password.isBlank() && password.matches(CustomerConstants.PASSWORD_REGEX);
	}

}
