package com.expenses.model;

import java.math.BigDecimal;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Table;


/*
 * Entity class defines structure for one table.
 */

@Entity
@Table
public class ExpenseInfo extends KeyEntity {
	
	private Date date;
	private BigDecimal expense;
	private String business;
	private String category;
	

	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public BigDecimal getExpense() {
		return expense;
	}
	public void setExpense(BigDecimal expense) {
		this.expense = expense;
	}
	public String getBusiness() {
		return business;
	}
	public void setBusiness(String business) {
		this.business = business;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	

}
