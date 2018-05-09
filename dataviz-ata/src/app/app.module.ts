import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'

import { AppComponent } from './app.component';
import { AirportComponent } from './airport/airport.component';
import { AirportComparisonComponent } from './airport-comparison/airport-comparison.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { AirportDescriptionComponent } from './airport-description/airport-description.component';
import { AppRoutingModule } from './app-routing.module';

import { AirportListService } from './airport-list.service';
import { TrafficService } from './traffic.service';
import { EmissionsService } from './emissions.service';

@NgModule({
  declarations: [
    AppComponent,
    AirportComponent,
    AirportComparisonComponent,
    AirportDetailsComponent,
    AirportDescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule
  ],
  providers: [
    AirportListService,
	TrafficService,
	EmissionsService,
	{provide: LOCALE_ID, useValue:'fr'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeFr, 'fr');

