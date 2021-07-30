import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/services/data-service.service';
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

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    this.suscription = this.service.getGlobalData()
      .subscribe(result => {
        this.data = result;
        this.data.forEach(cs=> {
          this.countries.push(cs.country);
        });
      })
  }

  ngOnDestroy(): void {
   this.suscription.unsubscribe();

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
  }
}