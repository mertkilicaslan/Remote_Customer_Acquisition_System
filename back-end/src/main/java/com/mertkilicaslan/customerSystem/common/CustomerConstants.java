package com.mertkilicaslan.customerSystem.common;

public class CustomerConstants {

    private CustomerConstants(){
        throw new AssertionError("Utility class!");
    }

    // This regex ensures that the string is in a basic email format.
    public static final String EMAIL_REGEX = "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$";
    // This regex ensures at least one lowercase letter, one uppercase letter, one digit, and a minimum length of 8.
    public static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{8,}$";

    // Exception messages
    public static final String EMAIL_PASSWORD_INVALID = "Email or password format is invalid!";
    public static final String EMAIL_PASSWORD_INCORRECT = "Email or password is incorrect!";
    public static final String CUSTOMER_CREDENTIALS_INVALID = "Customers register information is not valid!";
    public static final String CUSTOMER_ALREADY_EXIST = "Customer already exists with email: ";
}
