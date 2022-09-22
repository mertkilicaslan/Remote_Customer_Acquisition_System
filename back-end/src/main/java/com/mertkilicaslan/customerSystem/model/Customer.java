package com.mertkilicaslan.customerSystem.model;

import com.mertkilicaslan.customerSystem.config.AesEncryptor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@Entity(name = "customer")
@ApiModel(value = "CustomerObject")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    @ApiModelProperty(value="Customers' email")
    private String email;
    @Convert(converter = AesEncryptor.class)
    @ApiModelProperty(value="Customers' password")
    private String password;
    @ApiModelProperty(value="Customers' name")
    private String name;
    @ApiModelProperty(value="Customers' surname")
    private String surname;
    @ApiModelProperty(value="Customers' birthday")
    private String birthday;
    @ApiModelProperty(value="Customers' national ID")
    private String tcNo;
    @Convert(converter = AesEncryptor.class)
    @ApiModelProperty(value="Customers' telephone")
    private String phoneNo;
    @ApiModelProperty(value="Customers' hasat kart preferences")
    private String hasatKart;

    public Customer() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getTcNo() {
        return tcNo;
    }

    public void setTcNo(String tcNo) {
        this.tcNo = tcNo;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getHasatKart() {
        return hasatKart;
    }

    public void setHasatKart(String hasatKart) {
        this.hasatKart = hasatKart;
    }
}
