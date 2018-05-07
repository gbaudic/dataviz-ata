import { Component, OnInit } from '@angular/core';
import { DescriptionService } from 'app/description.service';
import { TrafficService } from 'app/traffic.service';
import { EmissionsService } from 'app/emissions.service';
import { AirportDescription } from 'app/app.component';
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
    // Fetch emissions -> graphics
	// Fetch top10
	// Fetch nb passengers and sum -> graphics
  }

}
