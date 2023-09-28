package com.mertkilicaslan.customerSystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.NewCustomerRequest;
import com.mertkilicaslan.customerSystem.dto.NewCustomerResponse;
import com.mertkilicaslan.customerSystem.service.CustomerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * The controller for Remote Customer Acquisition end points. This class handles
 * the SignUp and Login operations for Customers.
 * 
 * @author Mert Kılıçaslan
 * @see http://localhost:8080/swagger-ui/ for swagger documentation
 */

@Tag(name = "Customer Controller", description = "API Documentation for Remote Customer Acquisition System")
@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

	private final CustomerService customerService;

	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	/**
	 * Create a new Customer object and add it to the database with the data
	 * provided.
	 *
	 * @param request a representation of NewCustomerRequest containing the details
	 *                for the new customer.
	 * @return ResponseEntity containing a "isSuccess" boolean if the Customer
	 *         object is successfully added to the database and the status code.
	 */
	@PostMapping("/signup")
	@Operation(summary = "Register a new customer", description = "Receives customer information for registration")
	public ResponseEntity<NewCustomerResponse> createNewCustomer(@RequestBody NewCustomerRequest request) {
		return new ResponseEntity<NewCustomerResponse>(customerService.createNewCustomer(request), HttpStatus.CREATED);
	}

	/**
	 * Authenticate and fetch the existing Customer object from the database.
	 *
	 * @param request a representation of CustomerLoginRequest containing the
	 *                required login credentials like email and password.
	 * @return ResponseEntity containing the details of the logged-in customer if
	 *         they exist in the database and the status code.
	 */
	@PostMapping("/login")
	@Operation(summary = "Authenticate and fetch customer information", description = "Receives customer credentials for system login")
	public ResponseEntity<CustomerLoginResponse> getCustomerInformation(@RequestBody CustomerLoginRequest request) {
		return new ResponseEntity<CustomerLoginResponse>(customerService.getCustomerInformation(request),
				HttpStatus.OK);
	}
}
