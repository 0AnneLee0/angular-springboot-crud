import { Component, OnInit } from '@angular/core';
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
        barPercentage: 0.8,
        gridLines: {
          offsetGridLines: true
      }
      }], 
      yAxes:[{
        ticks: { },
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'left'
    },
    layout: { },
    plugins: {
      datalabels: {
        anchor:'end',
        align:'end'
      }
    },
    tooltips: {
      // { enabled: false } 
      // callbacks: {
      //   label: function(tooltipItems, data) {
      //     return data.datasets[tooltipItems.datasetIndex].label + ': ' +
      //       tooltipItems.yLabel.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      //   }
      // }
    }
  };
  
  public barChartLabels = this.date;

  public barChartType = 'bar';

  public barChartLegend = true;

  public barChartPlugins = {pluginDataLabels};

  public barChartData = [{
    label: 'Amount',
    // Formats number value into USD currency format.
    valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) },
    data: this.amount,
    backgroundColor: 'rgba(5, 79, 62)',
    borderWidth: 0,
    hoverBackgroundColor: 'rgba(12,102,122)',
    hoverBorderWidth: 0
  }];


  // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }
}
