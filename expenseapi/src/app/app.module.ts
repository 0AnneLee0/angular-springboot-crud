import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseService } from './expense/expense.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { KeysPipe } from './shared/keys.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    KeysPipe,
    BarChartComponent,
    PieChartComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    Ng2SmartTableModule,
    AppRoutingModule,
  ],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
