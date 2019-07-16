import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense/expense';
import { Category } from '../expense/category.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
import { ExpenseService } from '../expense/expense.service';

// npm install ng2-charts
// npm install chart.js
// npm install chartjs-plugin-datalabels --save

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class ChartsComponent implements OnInit {
  
  // HttpClient by default formats the response to JSON.
  constructor(
    private httpSvc: HttpClient,
    private expenseSvc: ExpenseService
  ) {}

  url = environment.baseUrl;

  expense: Expense[];
  categories: Category[];
  category:String[] = [];
  date:Date[] = [];
  amount:number[] = [];

  ngOnInit() {
    // Returns total for each category.
    this.expenseSvc.getTotalsByCategory().subscribe(
      (totalsData: any[]) => {
        totalsData.forEach(y => {
          this.amount.push(y[1].toFixed(2));
          this.category.push(y[0]);
        });
      });
  }

  public barChartOptions: ChartOptions = {
    scales: {xAxes: [{}], yAxes:[{}]},
    responsive: true,
    plugins: {
      datalabels: {
        anchor:'end',
        align:'end'
      }
    }
  };

  public barChartLabels = this.category;

  public barChartType = 'bar';

  public barChartLegend = true;

  public barChartPlugins = {pluginDataLabels};

  public barChartData = [{
    label: 'Amount',
    data: this.amount
  }];

}
