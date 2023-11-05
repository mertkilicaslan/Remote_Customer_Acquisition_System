package com.mertkilicaslan.customerSystem.model;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.mertkilicaslan.customerSystem.config.AesEncryptor;

import lombok.Data;

@Entity(name = "customer")
@Data
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private int id;

	@Column(name = "EMAIL", unique = true)
	private String email;

	@Convert(converter = AesEncryptor.class)
	@Column(name = "PASSWORD")
	private String password;

	@Column(name = "NAME")
	private String name;

	@Column(name = "SURNAME")
	private String surname;

	@Column(name = "BIRTHDAY")
	private String birthday;

	@Column(name = "TC_NO")
	private String tcNo;

	@Convert(converter = AesEncryptor.class)
	@Column(name = "PHONE_NO")
	private String phoneNo;

	@Column(name = "HK_PREF")
	private Boolean hasatKartPreference;

}
