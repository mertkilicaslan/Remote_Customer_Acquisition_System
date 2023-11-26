package com.mertkilicaslan.customerSystem.controller;

import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.CustomerRegisterRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerRegisterResponse;
import com.mertkilicaslan.customerSystem.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * The controller for Remote Customer Acquisition end points. This class handles
 * the Signup and Login operations for Customers.
 *
 * @author Mert Kılıçaslan
 * @see <a href="http://localhost:8080/swagger-ui/">Swagger documentation</a>
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

	@PostMapping("/signup")
	@Operation(summary = "Register a new customer", description = "Receives customer information for registration")
	public ResponseEntity<CustomerRegisterResponse> createNewCustomer(@RequestBody CustomerRegisterRequest request) {
		return new ResponseEntity<>(customerService.createNewCustomer(request), HttpStatus.CREATED);
	}

	@PostMapping("/login")
	@Operation(summary = "Authenticate and fetch customer information", description = "Receives customer credentials for system login")
	public ResponseEntity<CustomerLoginResponse> getCustomerInformation(@RequestBody CustomerLoginRequest request) {
		return new ResponseEntity<>(customerService.getCustomerInformation(request), HttpStatus.OK);
	}
}
