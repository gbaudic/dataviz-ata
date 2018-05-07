import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class EmissionsService {
  emissionData = [];
  pollutants = ["CO2", "NOX", "COVNM", "TSP"];

  constructor() { }
  
  getEmissions(oaci: string) : Observable<number[]> {
    let result : number[] = [];
	
    for(let ap of this.emissionData) {
	  if(ap.name === oaci) {
	    result = new Array(this.pollutants.length);
		result.fill(0);
			
		for(let i = 0 ; i < this.pollutants.length ; i++) {
		  result[i] = this.emissionData[`${this.pollutants[i]}_LC`]
		            + this.emissionData[`${this.pollutants[i]}_MC`]
					+ this.emissionData[`${this.pollutants[i]}_CC`];
		}
		
		return of(result);
	  }
	}
	return of(result);
  }
  
  // Unused, may have been useful to find correct line in array
  findAirport(record: any, oaci: string): boolean {
    return record.name === oaci;
  }

}
