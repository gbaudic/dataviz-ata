import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AirportDescription } from 'app/airport-component/airport.component';
import { airportData } from 'app/data/airports';

@Injectable()
export class AirportListService {

  constructor() { }
  
  getAirportList(): Observable<AirportDescription[]> {
    return of(airportData);
  }

  getAirportDescription(oaci: string): Observable<AirportDescription> {
    for(let ap of airportData) {
	  if(ap.oaci === oaci) {
	    return of(ap);
	  }
	}
  }
}
