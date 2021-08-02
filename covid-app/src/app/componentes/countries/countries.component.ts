import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { merge, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataServiceService } from 'src/app/services/data-service.service';
import { DateWiseData } from '../models/date-wise-data';
import { GlobalDataSummary } from '../models/global-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  suscription: Subscription;
  data:GlobalDataSummary[];
  countries:string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  dateWiseData;
  selectedCountryData: DateWiseData[];
  lineChart: GoogleChartInterface = {
    chartType: 'LineChart'
  };
  loading = true;

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {

    merge(
      this.service.getDateWiseData().pipe(
        map(result => {
          this.dateWiseData = result;
        })
      ),
      this.service.getGlobalData().pipe(map(result => {
          this.data = result;
          this.data.forEach(cs => {
            this.countries.push(cs.country);
          });
      }))
    ).subscribe({
      complete : () => {
        this.updateValues('Cuba');
        this.loading = false;
      }
    })
  }

 /* ngOnDestroy(): void {
   this.suscription.unsubscribe();

  }*/

  updateChart(){
    let dataTable = [];
    dataTable.push(['Date', 'Cases']);
    this.selectedCountryData.forEach(cs => {
      dataTable.push([cs.date, cs.cases]);
    });

    this.lineChart = {
      chartType: 'LineChart',
      dataTable: dataTable,
      options: {
        height: 500,
        animation:{
          duration: 1000,
          easing: 'out'
        }
      },
    };
  }

  updateValues(country: string)
  {
    this.data.forEach(cs => {
        if(cs.country === country){
          this.totalActive = cs.active;
          this.totalConfirmed = cs.confirmed;
          this.totalDeaths = cs.deaths;
          this.totalRecovered = cs.recovered;
        }
    });

    this.selectedCountryData = this.dateWiseData[country];
    this.updateChart();

  }
}
