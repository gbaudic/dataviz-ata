import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { top10Data } from 'app/data/top10';
import { flightsData } from 'app/data/flights';
import { passengersData } from 'app/data/passengers';

@Injectable()
export class TrafficService {
  hauls = ['LC', 'MC', 'CC'];

  constructor() { }
  
  getTop10(oaci: string): Observable<Array<[string, number]>> {
    for(let ap of top10Data) {
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
	
	for(let ap of passengersData) {
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
	
	return Observable.of(result);
  }

  getFlights(oaci: string, yearStart: number, yearEnd: number) : Observable<BarSeries[]> {
    let result: BarSeries[] = [];
	
	for(let ap of flightsData) {
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
	
	return Observable.of(result);
  }
}

/** Data class to help integration with chart.js library */
export class BarSeries {
  label: string;
  data: number[];
}
