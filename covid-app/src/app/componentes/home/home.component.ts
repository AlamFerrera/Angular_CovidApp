import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from '../models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  suscription: Subscription;
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  pieChart: GoogleChartInterface= {
    chartType: 'PieChart'
  };
  columnChart: GoogleChartInterface= {
    chartType: 'ColumnChart'
  };

  constructor(private dataService:DataServiceService) { }

  ngOnInit(): void {
   this.suscription = this.dataService.getGlobalData().subscribe(
      {
        next: (result)=> {
          this.globalData = result;
          result.forEach(cs =>{
              if(!Number.isNaN(cs.confirmed)){
                this.totalActive += cs.active;
                this.totalConfirmed += cs.confirmed;
                this.totalDeaths += cs.deaths;
                this.totalRecovered += cs.recovered
              }
          });
          this.initChart();
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  initChart(){

    let datatable = [];
    datatable.push(["Country","Cases"]);
    this.globalData.forEach(cs => {
      if(cs.confirmed > 2000)
      {
        datatable.push([
          cs.country , cs.confirmed
        ]);
      }
    })

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      options: {height: 500} //'Country': 'Cases'
    };

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      options: {height: 500} //'Country': 'Cases'
    };
  }
}
