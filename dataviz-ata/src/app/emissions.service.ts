import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { emission2Data } from 'app/data/emissions2';

@Injectable()
export class EmissionsService {
  pollutants = ["CO2", "NOX", "COVNM", "TSP"];

  constructor() { }

  getEmissions(oaci: string) : Observable<number[]> {
    let finalResult : number[] = [];

    for(let ap of emission2Data) {
      if(ap.name === oaci) {
        let result = new Array(this.pollutants.length);
        result.fill(0);

        for(let i = 0 ; i < this.pollutants.length ; i++) {
          result[i] = ap[`${this.pollutants[i]}_LC`]
                    + ap[`${this.pollutants[i]}_MC`]
                    + ap[`${this.pollutants[i]}_CC`];
        }

        if(result[0] > 0) {
          // If an airport has 0 as CO2 emissions, it is likely that we simply had no data for it
          return Observable.of(result);
        }
      }
	  }

	  return Observable.of(finalResult);
  }

}
