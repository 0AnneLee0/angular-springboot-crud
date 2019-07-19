import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense/expense.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor(private expenseSvc: ExpenseService) {}

  totals: Category[];
  amount: number[] = [];
  category: Label[] = [];
  grandTotal: number = 0;

  ngOnInit() {
    
    // Returns total for each category and creates array for total and category.
    this.expenseSvc.getTotalsByCategory().subscribe(
      (totalsData: any[]) => {
        this.totals = totalsData;
        totalsData.forEach(y => {
          this.amount.push(y[1].toFixed(2));
          this.category.push(y[0]);
          this.grandTotal += Number(y[1]);
      });
    });
  }

  public pieChartLabels: Label[] = this.category;
  public pieChartData: number[] = this.amount;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(136,194,19,0.3)', 
        'rgba(11, 82, 23,0.3)', 
        'rgba(12,102,122,0.3)', 
        'rgba(54,9,112,0.3)', 
        'rgba(190,129,227,0.3)'],
    },
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        display:false
        // formatter: (value, ctx) => {
        //   const label = ctx.chart.data.labels[ctx.dataIndex];
        //   return label;
        // },
      }
    }
  };

  // events
  //  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // changeLabels() {
  //   const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
  //     'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
  //     'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
  //     'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
  //     'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
  //   const randomWord = () => words[Math.trunc(Math.random() * words.length)];
  //   this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  // }

  // addSlice() {
  //   this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
  //   this.pieChartData.push(400);
  //   this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  // }

  // removeSlice() {
  //   this.pieChartLabels.pop();
  //   this.pieChartData.pop();
  //   this.pieChartColors[0].backgroundColor.pop();
  // }

  // changeLegendPosition() {
  //   this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  // }
}
