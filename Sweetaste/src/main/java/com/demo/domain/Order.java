package com.demo.domain;

import java.util.List;

public class Order {
	private int memberId;
	private String address;
	private String invoiceType;
	private String invoiceInfo;
	private List<OrderItem> items;
	
	private int id;
	private String orderDate;
	
	private String recipientName;
	private String recipientPhone;
	private String shippingStatus;
	
	private int subtotal;
	private int freight;
	private int total;

	public int getMemberId() {
		return memberId;
	}
	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

	public String getInvoiceType() {
		return invoiceType;
	}
	public void setInvoiceType(String invoiceType) {
		this.invoiceType = invoiceType;
	}

	public String getInvoiceInfo() {
		return invoiceInfo;
	}
	public void setInvoiceInfo(String invoiceInfo) {
		this.invoiceInfo = invoiceInfo;
	}

	public List<OrderItem> getItems() {
		return items;
	}
	public void setItems(List<OrderItem> items) {
		this.items = items;
	}
	
	public int getId() {
		return id; 
	}
	public void setId(int id) {
		this.id = id; 
	}
	
	public String getOrderDate() {
		return orderDate; 
	}
	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate; 
	}
	
	
	public String getRecipientName() {
	    return recipientName;
	}
	public void setRecipientName(String recipientName) {
	    this.recipientName = recipientName;
	}

	public String getRecipientPhone() {
	    return recipientPhone;
	}
	public void setRecipientPhone(String recipientPhone) {
	    this.recipientPhone = recipientPhone;
	}

	public String getShippingStatus() {
		return shippingStatus;
	}
	public void setShippingStatus(String shippingStatus) {
		this.shippingStatus = shippingStatus;
	}
	
	public int getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(int subtotal) {
		this.subtotal = subtotal;
	}
	
	public int getFreight() {
		return freight;
	}
	public void setFreight(int freight) {
		this.freight = freight;
	}
	
	public int getTotal() {
		return total;
	}
	
	public void setTotal(int total) {
		this.total = total;
	}
	
}
