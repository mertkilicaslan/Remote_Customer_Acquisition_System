package com.mertkilicaslan.customerSystem.controller;

import com.mertkilicaslan.customerSystem.model.Customer;
import com.mertkilicaslan.customerSystem.service.CustomerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The controller for Remote Customer Acquisition endpoints.
 * This class handles the SignUp and Login operations for Customers.
 * @author Mert Kılıçaslan
 *
 */
@RestController
@RequestMapping("/customer")
@CrossOrigin
@Api(value = "API Documentation for Remote Customer Acquisition System")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    /**
     * Create a new Customer object and add it to the database with the data provided.
     *
     * @param customer a JSON representation of Customer object.
     * @return "Successful" message if the Customer object successfully added to database.
     */
    @PostMapping("/signup")
    @ApiOperation(value = "Customers' information for registration")
    public String add(@RequestBody Customer customer){
        customerService.saveCustomer(customer);
        return "Successful";
    }

    /**
     * Read the existing Customer object from database.
     *
     * @param customer a JSON representation of Customer object with non-empty password and e-mail provided.
     * @return the existing Customer object credentials if customer does exist in the database.
     */
    @PostMapping("/login")
    @ApiOperation(value = "Customers' information for system login")
    public Customer getCustomer(@RequestBody Customer customer){
        return customerService.getCustomer(customer.getEmail(), customer.getPassword());
    }
}
