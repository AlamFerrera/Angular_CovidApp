import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './componentes/countries/countries.component';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'countries', component: CountriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
