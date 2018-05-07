import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AirportDescription } from 'app/airport-component/airport.component';

@Injectable()
export class AirportListService {
  airports = [];

  constructor() { }
  
  getAirportList(): Observable<AirportDescription[]> {
    return of(this.airports);
  }

  getAirportDescription(oaci: string): Observable<AirportDescription> {
    for(let ap of this.airports) {
	  if(ap.oaci === oaci) {
	    return of(ap);
	  }
	}
  }
}
