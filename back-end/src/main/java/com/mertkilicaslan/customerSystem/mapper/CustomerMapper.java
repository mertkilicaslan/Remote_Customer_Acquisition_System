package com.mertkilicaslan.customerSystem.mapper;

import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.CustomerRegisterRequest;
import com.mertkilicaslan.customerSystem.model.Customer;

public class CustomerMapper {

	private CustomerMapper() {
		throw new AssertionError("Utility class!");
	}

	public static Customer toEntity(CustomerRegisterRequest request) {
		if (request == null) {
			return null;
		}

		Customer customer = new Customer();

		customer.setEmail(request.getEmail());
		customer.setPassword(request.getPassword());
		customer.setName(request.getName());
		customer.setSurname(request.getSurname());
		customer.setBirthday(request.getBirthday());
		customer.setTcNo(request.getTcNo());
		customer.setPhoneNo(request.getPhoneNo());
		customer.setHasatKartPreference(request.getHasatKartPreference());

		return customer;
	}

	public static CustomerLoginResponse entityToResponse(Customer customer) {
		if (customer == null) {
			return null;
		}

		CustomerLoginResponse response = new CustomerLoginResponse();

		response.setEmail(customer.getEmail());
		response.setName(customer.getName());
		response.setSurname(customer.getSurname());
		response.setBirthday(customer.getBirthday());
		response.setTcNo(customer.getTcNo());
		response.setPhoneNo(customer.getPhoneNo());
		response.setHasatKartPreference(customer.getHasatKartPreference());

		return response;
	}

}
