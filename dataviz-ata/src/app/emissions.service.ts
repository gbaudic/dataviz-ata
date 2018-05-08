import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { emissionData } from 'app/data/emissions';

@Injectable()
export class EmissionsService {
  pollutants = ["CO2", "NOX", "COVNM", "TSP"];

  constructor() { }
  
  getEmissions(oaci: string) : Observable<number[]> {
    let finalResult : number[] = [];
	
    for(let ap of emissionData) {
	  if(ap.name === oaci) {
	    let result = new Array(this.pollutants.length);
		result.fill(0);
			
		for(let i = 0 ; i < this.pollutants.length ; i++) {
		  result[i] = emissionData[`${this.pollutants[i]}_LC`]
		            + emissionData[`${this.pollutants[i]}_MC`]
					+ emissionData[`${this.pollutants[i]}_CC`];
		}
		
		if(result[0] > 0) {
		  // If an airport has 0 as CO2 emissions, it is likely that we simply had no data for it
		  return Observable.of(result);
		}
	  }
	}
	return Observable.of(finalResult);
  }
  
  // Unused, may have been useful to find correct line in array
  findAirport(record: any, oaci: string): boolean {
    return record.name === oaci;
  }

}
