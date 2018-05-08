import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AirportDescription } from 'app/airport/airport.component';
import { airportData } from 'app/data/airports';

@Injectable()
export class AirportListService {

  constructor() { }
  
  getAirportList(): Observable<AirportDescription[]> {
    return Observable.of(airportData as AirportDescription[]);
  }

  getAirportDescription(oaci: string): Observable<AirportDescription> {
    for(let ap of airportData) {
	  if(ap.oaci === oaci) {
	    return Observable.of(ap as AirportDescription);
	  }
	}
  }
}
