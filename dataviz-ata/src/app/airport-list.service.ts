import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AirportDescription } from 'app/airport/airport.component';
import { airport2Data } from 'app/data/airports2';

@Injectable()
export class AirportListService {
  airports = airport2Data;

  constructor() { }

  getAirportList(): Observable<AirportDescription[]> {
    return Observable.of(this.airports as AirportDescription[]);
  }

  getAirportDescription(oaci: string): Observable<AirportDescription> {
    for(let ap of this.airports) {
	  if(ap.oaci === oaci) {
	    return Observable.of(ap as AirportDescription);
	  }
	}
  }
}
