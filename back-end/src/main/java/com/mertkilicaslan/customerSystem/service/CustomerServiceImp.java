package com.mertkilicaslan.customerSystem.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mertkilicaslan.customerSystem.dto.CreateCustomerRequest;
import com.mertkilicaslan.customerSystem.dto.CreateCustomerResponse;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
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
	public CreateCustomerResponse createNewCustomer(CreateCustomerRequest request) {
		CreateCustomerResponse response = new CreateCustomerResponse();
		response.setMessage("Unsuccessful");

		if (!isValidCustomerInformation(request)) {
			return response;
		}

		Customer customer = CustomerMapper.toEntity(request);
		customerRepository.save(customer);
		response.setMessage("Successful");
		return response;
	}

	@Override
	public CustomerLoginResponse getCustomerInformation(CustomerLoginRequest request) {
		CustomerLoginResponse response = new CustomerLoginResponse();
		response.setMessage("Unsuccessful");

		if (!isValidEmail(request.getEmail()) && !isValidPassword(request.getPassword())) {
			return response;
		}

		Optional<Customer> optionalCustomer = customerRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());
		if (optionalCustomer.isEmpty()) {
			return response;
		}

		response = CustomerMapper.entityToResponse(optionalCustomer.get());
		response.setMessage("Successful");
		return response;
	}

	boolean isValidCustomerInformation(CreateCustomerRequest request) {
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
				&& !request.getPhoneNo().isBlank() && request.getHasatKart() != null
				&& !request.getHasatKart().isBlank();
	}

	private boolean isValidEmail(String email) {
		// Regex: Basic email validation
		return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
	}

	private boolean isValidPassword(String password) {
		// Regex: Password must be at least 8 characters with 1 number
		return password.length() >= 8 && password.matches(".*\\d.*");
	}

}
