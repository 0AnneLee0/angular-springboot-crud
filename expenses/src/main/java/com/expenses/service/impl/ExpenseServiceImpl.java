package com.expenses.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expenses.model.ExpenseInfo;
import com.expenses.service.ExpenseRepository;
import com.expenses.service.ExpenseService;


@Service
public class ExpenseServiceImpl implements ExpenseService {
	
	@Autowired
	private ExpenseRepository expenseRepo;

	@Override
	public List<ExpenseInfo> getAllExpenses() {
		return expenseRepo.findAll();
	}
	
	@Override
	public ExpenseInfo getExpEntry(String pk) {
		return expenseRepo.findByPk(pk);
	}

	@Override
	public ExpenseInfo addExpEntry(ExpenseInfo expense) {
		return expenseRepo.save(expense);
	}

	@Override
	public ExpenseInfo updateExpEntry(String pk, ExpenseInfo expense) {
		ExpenseInfo expenseEntry = expenseRepo.findByPk(pk);
		expenseEntry.setDate(expense.getDate());
		expenseEntry.setCategory(expense.getCategory());
		expenseEntry.setBusiness(expense.getBusiness());
		expenseEntry.setExpense(expense.getExpense());
		
		return expenseRepo.save(expenseEntry);
	}

	@Override
	public void deleteExpEntry(ExpenseInfo expense) {
		expenseRepo.delete(expense);
	}
	
	@Override
	public BigDecimal totalCatExpense(String category) {
		return expenseRepo.categoryTotal(category);
	}

	@Override
	public List<Object[]> eachCategoryTotal() {
		return expenseRepo.eachCategoryTotal();
	}

}
