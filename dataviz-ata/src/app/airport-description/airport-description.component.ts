import { Component, OnInit } from '@angular/core';
import { DescriptionService } from 'app/description.service';
import { TrafficService } from 'app/traffic.service';
import { EmissionsService } from 'app/emissions.service';
import { AirportDescription } from 'app/airport-component/airport.component';
import Chart from 'chart.js';

@Component({
  selector: 'app-airport-description',
  templateUrl: './airport-description.component.html',
  styleUrls: ['./airport-description.component.css']
})
export class AirportDescriptionComponent implements OnInit {
  airport: AirportDescription;
  @Input() oaci: string;
  lastPassengers: number;
  emissions: number[] = [];
  top10: Array<[string, number]> = [];
  lastYear = 2016;
  
  flightsPerTypeChart: any;
  passengersPerYearChart: any;

  constructor(private description: DescriptionService,
              private traffic: TrafficService,
			  private emissions: EmissionsService
             ) { }

  ngOnInit() {
    // fetch description
	this.description.getDescription(this.oaci).subscribe(desc => { this.airport = desc; });
	
    // Fetch emissions -> graphics
	this.emissions.getEmissions(this.oaci).subscribe(emi => { 
	   this.emissions = emi; 
	});
	
	// Fetch top10
	this.traffic.getTop10(this.oaci).subscribe(res => { this.top10 = res; });
	// Fetch nb passengers and sum -> graphics
	
	// data :{labels: ['1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004',
	'2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016']}
  }

}
