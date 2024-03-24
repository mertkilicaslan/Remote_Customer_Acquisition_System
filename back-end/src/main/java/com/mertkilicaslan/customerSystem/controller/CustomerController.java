package com.mertkilicaslan.customerSystem.controller;

import com.mertkilicaslan.customerSystem.dto.request.BalanceOperationRequest;
import com.mertkilicaslan.customerSystem.dto.request.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.request.CustomerRegisterRequest;
import com.mertkilicaslan.customerSystem.dto.response.BalanceOperationResponse;
import com.mertkilicaslan.customerSystem.dto.response.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.response.CustomerRegisterResponse;
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


@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Remote Customer Acquisition System", description = "API Documentation for Remote Customer Acquisition System")
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

	@PostMapping("/updateBalance")
	@Operation(summary = "Update customer balance information", description = "Receives balance request and email")
	public ResponseEntity<BalanceOperationResponse> updateCustomerBalance(@RequestBody BalanceOperationRequest request) {
		return new ResponseEntity<>(customerService.updateCustomerBalance(request), HttpStatus.OK);
	}
}
