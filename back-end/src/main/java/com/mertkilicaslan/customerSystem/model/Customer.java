package com.mertkilicaslan.customerSystem.model;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.mertkilicaslan.customerSystem.config.AesEncryptor;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Entity(name = "customer")
@Data
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private int id;

	@Column(name = "EMAIL", unique = true)
	@ApiModelProperty(value = "Customer email")
	private String email;

	@Convert(converter = AesEncryptor.class)
	@Column(name = "PASSWORD")
	@ApiModelProperty(value = "Customer password")
	private String password;

	@Column(name = "NAME")
	@ApiModelProperty(value = "Customer name")
	private String name;

	@Column(name = "SURNAME")
	@ApiModelProperty(value = "Customer surname")
	private String surname;

	@Column(name = "BIRTHDAY")
	@ApiModelProperty(value = "Customer birthday")
	private String birthday;

	@Column(name = "TC_NO")
	@ApiModelProperty(value = "Customers national ID")
	private String tcNo;

	@Convert(converter = AesEncryptor.class)
	@Column(name = "PHONE_NO")
	@ApiModelProperty(value = "Customers telephone")
	private String phoneNo;

	@Column(name = "HK_PREF")
	@ApiModelProperty(value = "Customers hasat kart preferences")
	private Boolean hasatKartPreference;

}
