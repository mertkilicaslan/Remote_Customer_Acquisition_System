package com.mertkilicaslan.customerSystem.common;

public class CustomerConstants {

    // Regex validation patterns
    public static final String EMAIL_REGEX = "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$";
    // This regex ensures at least one lowercase letter, one uppercase letter, one digit, and a minimum length of 8.
    public static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{8,}$";

    // Exception messages
    public static final String EMAIL_PASSWORD_INVALID = "Email & password combination is invalid!";
    public static final String EMAIL_PASSWORD_INCORRECT = "Typed email or password is not correct!";
    public static final String CUSTOMER_CREDENTIALS_INVALID = "Customer information is not valid!";
    public static final String CUSTOMER_ALREADY_EXIST = "Customer already exists with email: ";
}
