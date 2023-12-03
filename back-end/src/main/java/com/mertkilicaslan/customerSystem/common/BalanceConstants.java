package com.mertkilicaslan.customerSystem.common;

public class BalanceConstants {
    private BalanceConstants() {
        throw new AssertionError("Utility class!");
    }

    public static final String INVALID_BALANCE_REQUEST = "Invalid balance operation request.";
    public static final String BALANCE_NOT_FOUND = "Balance not found for customer.";
    public static final String NOT_ENOUGH_DEBIT = "Not enough funds in debit balance for the requested withdrawal.";
    public static final String NOT_ENOUGH_CREDIT = "Not enough funds in credit balance for the requested withdrawal.";
}
