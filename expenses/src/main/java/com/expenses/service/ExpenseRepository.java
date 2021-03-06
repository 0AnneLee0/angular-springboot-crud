package com.expenses.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.expenses.model.ExpenseInfo;


/*
 * Extend JpaRepository and define class object. Allows you to use/leverage all features of Jpa repository.
 * @Qualifier annotation is used to control which bean should be autowired on a field. 
 */

@Repository
@Qualifier(value="expenseRepository")
public interface ExpenseRepository extends JpaRepository<ExpenseInfo, Long> {
	
	ExpenseInfo findByPk(final String PK);

	//Returns total expenses for one category
	@Query("SELECT SUM(expense) AS catExpense FROM ExpenseInfo WHERE category= :category")
	BigDecimal categoryTotal(@Param("category") String category);
	
	//Returns total expenses for each categories
	@Query("SELECT category, SUM(expense) AS catExpense FROM ExpenseInfo GROUP BY category")
	List<Object[]> eachCategoryTotal();
	
	/* 
	 * Queries below is work in progress.
	 */
	
	//Returns total expenses for each month 
//	@Query("SELECT MONTHNAME(date) AS month, SUM(expense) AS totals "
//			+ "FROM `expense_info` "
//			+ "WHERE YEAR(date) = 2019  "
//			+ "GROUP BY month")
//	List<Object[]> eachMonthTotal();
	
	//Returns total expenses for each month by category
//	@Query("SELECT MONTHNAME(date) AS month, category, SUM(expense) AS totals "
//			+ "FROM `expense_info` "
//			+ "WHERE YEAR(date) = 2019 "
//			+ "GROUP BY month, category")
//	List<Object[]> totalCategoryByMonth();
	
	/* 
	 * Queries below is work in progress.
	 */
	
	//Returns total expenses for each month 
//	@Query("SELECT MONTHNAME(date) AS month, SUM(expense) AS totals "
//			+ "FROM `expense_info` "
//			+ "WHERE YEAR(date) = 2019  "
//			+ "GROUP BY month")
//	List<Object[]> eachMonthTotal();
	
	//Returns total expenses for each month by category
//	@Query("SELECT MONTHNAME(date) AS month, category, SUM(expense) AS totals "
//			+ "FROM `expense_info` "
//			+ "WHERE YEAR(date) = 2019 "
//			+ "GROUP BY month, category")
//	List<Object[]> totalCategoryByMonth();
}
