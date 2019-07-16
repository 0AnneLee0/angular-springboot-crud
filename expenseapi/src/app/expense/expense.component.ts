import { Component, OnInit } from '@angular/core';
import { ExpenseService } from './expense.service';
import { Expense } from './expense';
import { Category } from './category.model';
// import { Category } from './category.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})

export class ExpenseComponent implements OnInit {

  // Create list for dropdown menu for form input.
  // categories: Category[] = [
  //   { id: 1, name: 'Health Care' },
  //   { id: 2, name: 'Utilities' },
  //   { id: 3, name: 'Dining' },
  //   { id: 4, name: 'Groceries' },
  //   { id: 5, name: 'Home Improvement' },
  //   { id: 6, name: 'Entertainment' },
  //   { id: 7, name: 'Auto' },
  //   { id: 8, name: 'Dept Stores' }
  // ]

  expenses: Expense[];
  expense = new Expense();
  totalRec: number;
  totals: Category[];
  total: number;
  grandTotal: number;

  constructor(private expenseSvc: ExpenseService) { }

  ngOnInit() {
    this.getExpenses();
  }

  //Gets all expenses.
  getExpenses():void {
    this.expenseSvc.getAllEntries().subscribe(
      (expenseData: any[]) => {
        this.expenses = expenseData;
        this.totalRec = this.expenses.length;
        // console.log(this.totalRec);
        // console.log(this.expenses);
      },
      (error) => { console.log(error) }
    );
  }

  // Gets single entry by id.
  getEntryById(expenseId: string) {
    this.expenseSvc.getExpenseById(expenseId).subscribe(
      (expenseData) => {
        this.expense = expenseData;
        this.getExpenses();
      });
  }

  // Adds single entry.
  addExpenseEntry(): void {
    this.expenseSvc.addExpenseEntry(this.expense)
      .subscribe((response) => {
        console.log(response);
        this.reset();
        this.getExpenses();
      }, (addError) => {
        console.log(addError);
      }
      );
  }

  // Resets form, not working properly (need fix).
  private reset() {
    this.expense.pk = null;
    this.expense.date = null;
    this.expense.expense = null;
    this.expense.business = null;
    this.expense.category = null;
  }

  // Deletes single entry.
  deleteEntry(expenseId: string) {
    this.expenseSvc.deleteEntry(expenseId).subscribe(
      (response) => {
        console.log(response);
        this.getExpenses();
      },
      (deleteError) => { console.log(deleteError); }
    );
  }

  // Returns total for single category.
  getCategoryTotal(category: string) {
    this.expenseSvc.getCategoryTotal(category).subscribe(
      (totalData: number) => {
        this.total = totalData;
      });
  }

  // Returns total for each category.
  getTotalByCategory(): void {
    this.expenseSvc.getTotalsByCategory().subscribe(
      (totalsData: any[]) => {
        this.totals = totalsData;
        console.log(this.totals);
      });
  }


  // ng2-smart-table action buttons
  onCreateConfirm(event) {
    this.expense = (event.newData);
    this.addExpenseEntry();
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve(
        this.deleteEntry(event.data.pk)
      );
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.confirm.resolve();
      this.getEntryById(event.data.pk);
      this.onCreateConfirm(event);
    } else {
      event.confirm.reject();
    }
  }


  //Configuration to make ng2-smart-table
  //Create list for dropdown menu for filter and input.
  categoryList = [
    { value: 'Health Care', title: 'Health Care' },
    { value: 'Utilities', title: 'Utilities' },
    { value: 'Dining', title: 'Dining' },
    { value: 'Groceries', title: 'Groceries' },
    { value: 'Home Improvement', title: 'Home Improvement' },
    { value: 'Entertainment', title: 'Entertainment' },
    { value: 'Auto', title: 'Auto' },
    { value: 'Dept Stores', title: 'Dept Stores' }
  ];

  settings = {
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="fa fas fa-plus fa-lg"></i>&nbsp;&nbsp;Add new entry', 
      createButtonContent: '<i class="fa fas fa-check fa-lg"></i>&nbsp;',
      cancelButtonContent: '<i class="fa far fa-window-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="fa far fa-edit fa-lg"></i>&nbsp;',
      saveButtonContent: '<i class="fa fas fa-check"></i>&nbsp;',
      cancelButtonContent: '<i class="fa far fa-window-close"></i>',
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="fa fas fa-trash fa-lg"></i>',
    },
    columns: {
      pk: {
        title: 'ID',
        width: '8%'
      },
      date: {
        title: 'Date',
        width: '10%'
      },
      expense: {
        title: 'Amount',
        // Formats number value into USD currency format.
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) }
      },
      business: {
        title: 'Business',
        width: '20%'
      },
      category: {
        title: 'Category',
        type: 'html',
        width: '20%',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: this.categoryList
          },
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: this.categoryList
          }
        }
      }
    },
    actions: {
      width: '6%'
    },
    pager: {
      display: true,
      perPage: 7
    },
    attr: {
      class: 'table table-bordered'
    }
  };

}
