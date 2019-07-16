package com.expenses.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.expenses.model.ExpenseInfo;



@Service
public interface ExpenseService {

	//Gets all entries
	List<ExpenseInfo> getAllExpenses();
	
	//Gets single entry
	ExpenseInfo getExpEntry(final String pk);
	
	//Adds Expense entry
	ExpenseInfo addExpEntry(ExpenseInfo expense);
	
	//Updates Expense entry
	ExpenseInfo updateExpEntry(final String pk, ExpenseInfo expense);
	
	//Deleted entry
	void deleteExpEntry(ExpenseInfo expense);
	
	//Gets total expense for single category
	BigDecimal totalCatExpense(String category);
	
	//Gets total expense for each category
	List<Object[]> eachCategoryTotal();

}
