package com.mertkilicaslan.customerSystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mertkilicaslan.customerSystem.dto.CreateCustomerRequest;
import com.mertkilicaslan.customerSystem.dto.CreateCustomerResponse;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.service.CustomerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * The controller for Remote Customer Acquisition endpoints.
 * This class handles the SignUp and Login operations for Customers.
 * @author Mert Kılıçaslan
 *
 */
@RestController
@RequestMapping("/customer")
@Api(value = "API Documentation for Remote Customer Acquisition System")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
	
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	/**
     * Create a new Customer object and add it to the database with the data provided.
     *
     * @param customer a JSON representation of Customer object.
     * @return "Successful" message if the Customer object successfully added to database.
     */
    @PostMapping("/signup")
    @ApiOperation(value = "Customers' information for registration")
    public ResponseEntity<CreateCustomerResponse> createNewCustomer(@RequestBody CreateCustomerRequest request){
    	return new ResponseEntity<CreateCustomerResponse>(customerService.createNewCustomer(request), HttpStatus.CREATED);
    }

    /**
     * Read the existing Customer object from database.
     *
     * @param customer a JSON representation of Customer object with non-empty password and e-mail provided.
     * @return the existing Customer object credentials if customer does exist in the database.
     */
    @PostMapping("/login")
    @ApiOperation(value = "Customers' information for system login")
    public ResponseEntity<CustomerLoginResponse> getCustomerInformation(@RequestBody CustomerLoginRequest request){
        return new ResponseEntity<CustomerLoginResponse>(customerService.getCustomerInformation(request), HttpStatus.OK);
    }
}
