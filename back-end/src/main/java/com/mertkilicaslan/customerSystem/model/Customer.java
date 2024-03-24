package com.mertkilicaslan.customerSystem.model;

import com.mertkilicaslan.customerSystem.config.AesEncryptor;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "CUSTOMER")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

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


