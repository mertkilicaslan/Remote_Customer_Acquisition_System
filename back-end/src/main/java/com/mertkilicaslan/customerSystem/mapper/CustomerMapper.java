package com.mertkilicaslan.customerSystem.mapper;

import com.mertkilicaslan.customerSystem.dto.CreateCustomerRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.model.Customer;

public class CustomerMapper {

	public final static Customer toEntity(CreateCustomerRequest request) {
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
		customer.setHasatKart(request.getHasatKart());

		return customer;
	}

	public final static CustomerLoginResponse entityToResponse(Customer customer) {
		if (customer == null) {
			return null;
		}

		CustomerLoginResponse response = new CustomerLoginResponse();

		response.setEmail(customer.getEmail());
		response.setPassword(customer.getPassword());
		response.setName(customer.getName());
		response.setSurname(customer.getSurname());
		response.setBirthday(customer.getBirthday());
		response.setTcNo(customer.getTcNo());
		response.setPhoneNo(customer.getPhoneNo());
		response.setHasatKart(customer.getHasatKart());

		return response;
	}

}
