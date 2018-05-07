import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { AirportComponent } from './airport/airport.component';
import { AirportComparisonComponent } from './airport-comparison/airport-comparison.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { AirportDescriptionComponent } from './airport-description/airport-description.component';
import { AppRoutingModule } from './app-routing.module';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
