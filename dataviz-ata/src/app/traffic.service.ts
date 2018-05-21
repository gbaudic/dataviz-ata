import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { top102Data } from 'app/data/top102';
import { flights2Data } from 'app/data/flights2';
import { passengers2Data } from 'app/data/passengers2';

@Injectable()
export class TrafficService {
  hauls = ['LC', 'MC', 'CC'];
  colors = ['rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)'];
  top10 = top102Data;
  flights = flights2Data;
  passengers = passengers2Data;

  constructor() { }

  getTop10(oaci: string): Observable<Array<[string, number]>> {
    for(let ap of this.top10) {
	    if(ap.name === oaci) {
	      let result : Array<[string, number]> = [];
		    for(let i = 1 ; i <= 10 ; i++) {
		      if(ap[`dest_${i}`].length > 0) { // make sure to stop when there are <= 10 items
		        result.push([ap[`dest_${i}`],ap[`pax_${i}`]]);
		      }
		    }

		    return Observable.of(result);
	    }
	  }
  }

  getTraffic(oaci: string, yearStart: number, yearEnd: number) : Observable<BarSeries[]> {
    let result: BarSeries[] = [];

    for(let ap of this.passengers) {
      if(ap.name === oaci) {
        for(let h of this.hauls) {
          let data: number[] = [];
          for(let i = yearStart ; i <= yearEnd ; i++) {
            data.push(ap[`${h}_${i}`]);
          }

          result.push({label: h, data: data, backgroundColor: this.colors[this.hauls.indexOf(h)]});
        }
      }
    }

    return Observable.of(result);
  }

  getFlights(oaci: string, yearStart: number, yearEnd: number) : Observable<BarSeries[]> {
    let result: BarSeries[] = [];

    for(let ap of this.flights) {
      if(ap.name === oaci) {
        for(let h of this.hauls) {
          let data: number[] = [];
          for(let i = yearStart ; i <= yearEnd ; i++) {
            data.push(ap[`${h}_${i}`]);
          }

          result.push({label: h, data: data, backgroundColor: this.colors[this.hauls.indexOf(h)]});
        }
      }
    }

	  return Observable.of(result);
  }
}

/** Data class to help integration with chart.js library */
export class BarSeries {
  label: string;
  backgroundColor: string;
  data: number[];
}
