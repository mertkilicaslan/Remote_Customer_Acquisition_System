package com.mertkilicaslan.customerSystem.common;

public class CustomerConstants {

	// Pattern for email validation
	public static final String EMAIL_REGEX = "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$";

	// Pattern for password validation
	// This regex ensures at least one lowercase letter, one uppercase letter, one digit, and a minimum length of 8.
	public static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{8,}$";
}
