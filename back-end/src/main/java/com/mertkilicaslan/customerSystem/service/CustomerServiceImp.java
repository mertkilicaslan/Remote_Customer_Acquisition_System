package com.mertkilicaslan.customerSystem.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.NewCustomerRequest;
import com.mertkilicaslan.customerSystem.dto.NewCustomerResponse;
import com.mertkilicaslan.customerSystem.mapper.CustomerMapper;
import com.mertkilicaslan.customerSystem.model.Customer;
import com.mertkilicaslan.customerSystem.repository.CustomerRepository;

@Service
public class CustomerServiceImp implements CustomerService {

	private final CustomerRepository customerRepository;

	public CustomerServiceImp(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	@Override
	public NewCustomerResponse createNewCustomer(NewCustomerRequest request) {
		NewCustomerResponse response = new NewCustomerResponse();
		response.setIsSuccess(false);

		if (!isValidCustomerInformation(request)) {
			return response;
		}

		Optional<Customer> optionalCustomer = customerRepository.findByEmail(request.getEmail());
		if (optionalCustomer.isPresent()) {
			return response;
		}

		Customer customer = CustomerMapper.toEntity(request);
		customerRepository.save(customer);
		response.setIsSuccess(true);
		return response;
	}

	@Override
	public CustomerLoginResponse getCustomerInformation(CustomerLoginRequest request) {
		CustomerLoginResponse response = new CustomerLoginResponse();
		response.setIsSuccess(false);

		if (!isValidEmail(request.getEmail()) && !isValidPassword(request.getPassword())) {
			return response;
		}

		Optional<Customer> optionalCustomer = customerRepository.findByEmailAndPassword(request.getEmail(),
				request.getPassword());
		if (optionalCustomer.isEmpty()) {
			return response;
		}

		response = CustomerMapper.entityToResponse(optionalCustomer.get());
		response.setIsSuccess(true);
		return response;
	}

	boolean isValidCustomerInformation(NewCustomerRequest request) {
		if (request.getEmail() == null || request.getEmail().isBlank() || !isValidEmail(request.getEmail())) {
			return false;
		}
		if (request.getPassword() == null || request.getPassword().isBlank()
				|| !isValidPassword(request.getPassword())) {
			return false;
		}
		return request.getName() != null && !request.getName().isBlank() && request.getSurname() != null
				&& !request.getSurname().isBlank() && request.getBirthday() != null && !request.getBirthday().isBlank()
				&& request.getTcNo() != null && !request.getTcNo().isBlank() && request.getPhoneNo() != null
				&& !request.getPhoneNo().isBlank() && request.getHasatKartPreference() != null;

	}

	private boolean isValidEmail(String email) {
		// RegEx: Basic email validation
		return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
	}

	private boolean isValidPassword(String password) {
		// RegEx: Password must be at least 8 characters with 1 number
		return password.length() >= 8 && password.matches(".*\\d.*");
	}

}
