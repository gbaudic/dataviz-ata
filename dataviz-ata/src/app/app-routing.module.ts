import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AirportComponent } from './airport/airport.component';
import { AirportComparisonComponent } from './airport-comparison/airport-comparison.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { AirportDescriptionComponent } from './airport-description/airport-description.component';
import { AboutComponent } from 'app/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: AirportComponent },
  { path: 'details/:oaci', component: AirportDetailsComponent },
  { path: 'comparaison', component: AirportComparisonComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
