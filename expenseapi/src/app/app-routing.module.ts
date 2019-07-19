import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ExpenseComponent } from './expense/expense.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
    {path: '', component: MainComponent},
    {path: 'table', component: ExpenseComponent},
    {path: 'pie-chart', component: PieChartComponent},
    {path: 'bar-chart', component: BarChartComponent},
    // {path: '**', component: BarChartComponent},
    // {path: '', redirect: "/", pathMatch: 'full' }
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }