import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
import { ExpenseService } from '../expense/expense.service';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

// npm install ng2-charts
// npm install chart.js
// npm install chartjs-plugin-datalabels --save

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  
  constructor(private expenseSvc: ExpenseService) {}

  date:Date[] = [];
  amount:number[] = [];

  ngOnInit() {
    // Creates array for each field: expense and date.
    this.expenseSvc.getAllEntries().subscribe(
      (data: any[]) => {
        data.forEach(y => {
          this.amount.push(y.expense.toFixed(2));
          this.date.push(y.date);
      });
    });
  }

  public barChartOptions: ChartOptions = {
    scales: {
      xAxes: [{
        categoryPercentage: 1.0
      }], 
      yAxes:[{}]},
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'left'
    },
    plugins: {
      datalabels: {
        anchor:'end',
        align:'end'
      }
    }
  };
  
  public barChartLabels = this.date;

  public barChartType = 'bar';

  public barChartLegend = true;

  public barChartPlugins = {pluginDataLabels};

  public barChartData = [{
    label: 'Amount',
    data: this.amount
  }];


  // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public randomize(): void {
  //   // Only Change 3 values
  //   const data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   this.barChartData[0].data = data;
  // }
}
