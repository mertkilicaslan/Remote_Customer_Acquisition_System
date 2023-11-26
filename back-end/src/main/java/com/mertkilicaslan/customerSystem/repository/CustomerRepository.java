package com.mertkilicaslan.customerSystem.repository;

import com.mertkilicaslan.customerSystem.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	Optional<Customer> findByEmail(String email);

	Optional<Customer> findByEmailAndPassword(String email, String password);

}
