package com.mertkilicaslan.customerSystem.repository;

import com.mertkilicaslan.customerSystem.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM customer c WHERE c.email = :email AND c.password = :password")
    Customer getUser(@Param("email") String email, @Param("password") String password);
}
