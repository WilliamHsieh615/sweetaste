package com.demo.domain;

import java.sql.Timestamp;
import java.sql.Date;

public class Member {
    private int id;
    private String account;
    private String password;
    private String name;
    private String phone;
    private Date birthday;
    private boolean promotionalInfo;
    private Timestamp createdAt;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }
    public void setAccount(String account) {
        this.account = account;
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

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getBirthday() {
        return birthday;
    }
    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public boolean isPromotionalInfo() {
        return promotionalInfo;
    }
    public void setPromotionalInfo(boolean promotionalInfo) {
        this.promotionalInfo = promotionalInfo;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}

