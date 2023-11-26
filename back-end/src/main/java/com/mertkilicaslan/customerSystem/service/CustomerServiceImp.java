package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.common.CustomerConstants;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.CustomerRegisterRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerRegisterResponse;
import com.mertkilicaslan.customerSystem.mapper.CustomerMapper;
import com.mertkilicaslan.customerSystem.model.Customer;
import com.mertkilicaslan.customerSystem.repository.CustomerRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.NoSuchElementException;

@Service
public class CustomerServiceImp implements CustomerService {

	private final CustomerRepository customerRepository;

	public CustomerServiceImp(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	@Override
	public CustomerRegisterResponse createNewCustomer(CustomerRegisterRequest request) {
		if (request == null || !isValidCustomerInformation(request)) {
			throw new IllegalArgumentException(CustomerConstants.CUSTOMER_CREDENTIALS_INVALID);
		}

		customerRepository.findByEmail(request.getEmail()).ifPresent(c -> {
			throw new DataIntegrityViolationException(CustomerConstants.CUSTOMER_ALREADY_EXIST + c.getEmail());
		});

		customerRepository.save(CustomerMapper.toEntity(request));

		CustomerRegisterResponse response = new CustomerRegisterResponse();
		response.setIsSuccess(true);
		return response;
	}

	@Override
	public CustomerLoginResponse getCustomerInformation(CustomerLoginRequest request) {
		if (request == null || !isValidEmailFormat(request.getEmail()) || !isValidPasswordFormat(request.getPassword())) {
			throw new IllegalArgumentException(CustomerConstants.EMAIL_PASSWORD_INVALID);
		}

		Customer customer = customerRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new NoSuchElementException(CustomerConstants.EMAIL_PASSWORD_INCORRECT));

		CustomerLoginResponse response = CustomerMapper.entityToResponse(customer);
		response.setIsSuccess(true);
		return response;
	}

	private boolean isValidCustomerInformation(CustomerRegisterRequest request) {
		return isValidEmailFormat(request.getEmail()) && isValidPasswordFormat(request.getPassword())
				&& StringUtils.hasText(request.getName()) && StringUtils.hasText(request.getSurname())
				&& StringUtils.hasText(request.getTcNo()) && StringUtils.hasText(request.getPhoneNo())
				&& StringUtils.hasText(request.getBirthday()) && request.getHasatKartPreference() != null;
	}

	private boolean isValidEmailFormat(String email) {
		return StringUtils.hasText(email) && email.matches(CustomerConstants.EMAIL_REGEX);
	}

	private boolean isValidPasswordFormat(String password) {
		return StringUtils.hasText(password) && password.matches(CustomerConstants.PASSWORD_REGEX);
	}

}
