package com.mertkilicaslan.customerSystem.service;

import com.mertkilicaslan.customerSystem.dto.request.BalanceOperationRequest;
import com.mertkilicaslan.customerSystem.dto.request.CustomerLoginRequest;
import com.mertkilicaslan.customerSystem.dto.request.CustomerRegisterRequest;
import com.mertkilicaslan.customerSystem.dto.response.BalanceOperationResponse;
import com.mertkilicaslan.customerSystem.dto.response.CustomerLoginResponse;
import com.mertkilicaslan.customerSystem.dto.response.CustomerRegisterResponse;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.NoSuchElementException;

public interface CustomerService {

    /**
     * Creates and adds a new Customer object to the database based on the provided request.
     * Validates the request for null or invalid data, and checks for existing customers with the same email.
     * Throws IllegalArgumentException for invalid requests and DataIntegrityViolationException for duplicate emails.
     * On successful creation, returns a CustomerRegisterResponse with "isSuccess" set to true.
     *
     * @param request A representation of {@link CustomerRegisterRequest} containing the details for the new customer.
     *                Must not be null and contain valid information.
     * @return {@link CustomerRegisterResponse} with "isSuccess" boolean set to true if the customer is successfully added.
     * @throws IllegalArgumentException If the request is null or contains invalid customer information.
     * @throws DataIntegrityViolationException If a customer with the same email already exists.
     */
    CustomerRegisterResponse createNewCustomer(CustomerRegisterRequest request);

    /**
     * Authenticates and retrieves an existing Customer object from the database based on the provided login credentials.
     * Validates the request for null, valid email format, and valid password format. Throws IllegalArgumentException
     * if the request is null or if either email or password format is invalid. If no customer matches the provided
     * email and password, a NoSuchElementException is thrown. On successful authentication, returns a
     * CustomerLoginResponse containing the details of the logged-in customer with "isSuccess" set to true.
     *
     * @param request A representation of {@link CustomerLoginRequest} containing the required login credentials like email and password.
     *                The email and password must be in valid formats.
     * @return {@link CustomerLoginResponse} containing the details of the logged-in customer if they exist in the database.
     *         The response includes a "isSuccess" flag set to true on successful authentication.
     * @throws IllegalArgumentException If the request is null or the email/password format is invalid.
     * @throws NoSuchElementException If no customer is found matching the provided email and password.
     */
    CustomerLoginResponse getCustomerInformation(CustomerLoginRequest request);

    /**
     * Updates the balance information of a customer based on the provided request.
     * This method first validates the request, it then retrieves the customer using the
     * provided email. If the customer is found, it updates their balance as per the request
     * and returns the updated balance information.
     *
     * @param request The {@link BalanceOperationRequest} containing the details for
     *                the balance update, including the customer's email.
     * @return A {@link BalanceOperationResponse} containing the updated credit and
     *         debit balances of the customer and a success flag.
     * @throws IllegalArgumentException If the request is null or the email format is invalid.
     * @throws NoSuchElementException If no customer is found with the given email.
     */
    BalanceOperationResponse updateCustomerBalance(BalanceOperationRequest request);

}
