package com.mertkilicaslan.customerSystem.model;

import com.mertkilicaslan.customerSystem.config.AesEncryptor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;

@Entity(name = "customer")
@ApiModel(value = "CustomerObject")
@Data
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(unique = true)
	@ApiModelProperty(value = "Customer email")
	private String email;
	@Convert(converter = AesEncryptor.class)
	@ApiModelProperty(value = "Customer password")
	private String password;
	@ApiModelProperty(value = "Customer name")
	private String name;
	@ApiModelProperty(value = "Customer surname")
	private String surname;
	@ApiModelProperty(value = "Customer birthday")
	private String birthday;
	@ApiModelProperty(value = "Customers national ID")
	private String tcNo;
	@Convert(converter = AesEncryptor.class)
	@ApiModelProperty(value = "Customers telephone")
	private String phoneNo;
	@ApiModelProperty(value = "Customers hasat kart preferences")
	private String hasatKart;

}
