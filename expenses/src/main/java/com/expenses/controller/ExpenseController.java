package com.expenses.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.expenses.model.ExpenseInfo;
import com.expenses.service.ExpenseService;


/*
 * Class provides an endpoint access from outside.
 */

@CrossOrigin("*")
@RestController
public class ExpenseController {
	
	@Autowired
	private ExpenseService expenseSvc;
	
	
	//GET - Returns all expense entries:
	@RequestMapping(value="/expense")
	public ResponseEntity<List<ExpenseInfo>> list() {
		List<ExpenseInfo> list = expenseSvc.getAllExpenses();
		return ResponseEntity.ok().body(list);
	}

	//POST - Add single expense entry:
	@RequestMapping(method=RequestMethod.POST, value="/expense/add")
	public ResponseEntity<?> saveExpenseEntry(@RequestBody ExpenseInfo expense) {
		if(expenseSvc.getExpEntry(expense.getPk())==null && expense!=null) {
			expenseSvc.addExpEntry(expense);
			return ResponseEntity.ok().body("Expense entry created");
		} else {
			return ResponseEntity.ok().body("Error saving employee information");
		}
	}
	
	//GET - Find specific expense entry by id:
	@RequestMapping(value="/expense/{id}")
	public ResponseEntity<ExpenseInfo> getExpense(@PathVariable("id") String pk) {
		ExpenseInfo expense = expenseSvc.getExpEntry(pk);
		return ResponseEntity.ok().body(expense);
	}
	
	//PUT - Updates a single expense entry:
	@RequestMapping(method=RequestMethod.PUT, value="/expense/{id}")
	public ResponseEntity<?> updateExpense(@PathVariable("id") String pk, @RequestBody ExpenseInfo expense) {
		expenseSvc.updateExpEntry(pk, expense);
		return ResponseEntity.ok().body("Expense entry updated");
	}
	
	//PUT - Delete a single expense entry:
	//localhost:8080/expense/delete?expId=
	@RequestMapping(method=RequestMethod.PUT, value="/expense/delete")
	public ResponseEntity<?> deleteExpenseEntry(@RequestParam(name="expId",required=true) String pk) {
		try{
			expenseSvc.deleteExpEntry(expenseSvc.getExpEntry(pk));
			return ResponseEntity.ok().body("Expense deleted");
		} catch(Exception e) {
			return ResponseEntity.ok().body("error");
		}
	}
	
	//GET - Queries database to find total expenses for single category:
	@RequestMapping(value="/expense/category/{category}")
	public ResponseEntity<?> getTotalExpense(@PathVariable("category") String category) {
		BigDecimal totalExpense = expenseSvc.totalCatExpense(category);
		return ResponseEntity.ok().body(totalExpense);
	}
	
	//GET - Queries database to find total expenses for each category:
	@RequestMapping(value="/expense/category")
	public ResponseEntity<?> getTotalCatExpense() {
		List<Object[]> result = expenseSvc.eachCategoryTotal();
		return ResponseEntity.ok().body(result);
	}

}
