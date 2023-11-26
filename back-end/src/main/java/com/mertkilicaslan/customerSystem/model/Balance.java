package com.mertkilicaslan.customerSystem.model;

import com.mertkilicaslan.customerSystem.config.AesEncryptor;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "BALANCE")
public class Balance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "CREDIT_BALANCE")
    private Integer creditBalance;

    @Column(name = "DEBIT_BALANCE")
    private Integer debitBalance;

    @OneToOne
    @JoinColumn(name = "CUSTOMER_ID")
    private Customer customer;

}
