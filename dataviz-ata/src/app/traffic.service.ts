import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TrafficService {
  hauls = ['LC', 'MC', 'CC'];
  trafficData = [];
  flightsData = [];
  top10Data = [];

  constructor() { }
  
  getTop10(oaci: string): Observable<Array<[string, number]>> {
    for(let ap of this.top10Data) {
	  if(ap.name === oaci) {
	    let result : Array<[string, number]> = [];
		for(let i = 1 ; i <= 10 ; i++) {
		  if(ap[`dest_${i}`].length > 0) { // make sure to stop when there are <= 10 items
		    result.push([ap[`dest_${i}`],ap[`pax_${i}`]]);
		  }
		}
		
		return of(result);
	  }
	}
  }
  
  getTraffic(oaci: string, yearStart: number, yearEnd: number) : Observable<BarSeries[]> {
    let result: BarSeries[] = [];
	
	for(let ap of this.trafficData) {
	  if(ap.name === oaci) {
	    for(let h of this.hauls) {
		  let data: number[] = [];
		  for(let i = yearStart ; i <= yearEnd ; i++) {
		    data.push(ap[`${h}_${i}`]);
		  }
		  
		  result.push({label: h, data: data});
		}
	  }
	}
	
	return of(result);
  }

  getFlights(oaci: string, yearStart: number, yearEnd: number) : Observable<BarSeries[]> {
    let result: BarSeries[] = [];
	
	for(let ap of this.flightsData) {
	  if(ap.name === oaci) {
	    for(let h of this.hauls) {
		  let data: number[] = [];
		  for(let i = yearStart ; i <= yearEnd ; i++) {
		    data.push(ap[`${h}_${i}`]);
		  }
		  
		  result.push({label: h, data: data});
		}
	  }
	}
	
	return of(result);
  }
}

/** Data class to help integration with chart.js library */
export class BarSeries {
  label: string;
  data: number[];
}
