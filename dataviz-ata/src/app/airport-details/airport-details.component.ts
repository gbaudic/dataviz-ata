import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrafficService, BarSeries } from 'app/traffic.service';
import { EmissionsService } from 'app/emissions.service';
import { AirportListService } from 'app/airport-list.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent implements OnInit {
  @Input() yearStart = 1990;
  @Input() oaci: string;
  @Input() yearEnd = 2016;
  @Input() showDatePicker = true;

  passengersChart: any;
  flightsChart: any;

  constructor(private traffic: TrafficService,
              private emissions: EmissionsService,
			  private airports: AirportListService,
			  private route: ActivatedRoute) { }

  ngOnInit() {
    this.oaci = this.route.snapshot.paramMap.get('oaci');
	
	if(this.oaci) {
	  this.drawGraphs();
	} 
  }
  
  drawGraphs(): void {
    this.traffic.getTraffic(this.oaci, this.yearStart, this.yearEnd).subscribe(
		data => {
		this.passengersChart = new Chart('passengers',
		{
		type: 'bar',
		data: {labels: this.makeXAxis(), datasets: data},
		options: {
			scales: {
				xAxes: [{
					stacked: true
				}],
				yAxes: [{
					stacked: true
				}]
			}
		}
		})
	  });

	  this.traffic.getFlights(this.oaci, this.yearStart, this.yearEnd).subscribe(
		data => {
		this.flightsChart = new Chart('flights',
		{
		type: 'bar',
		data: {labels: this.makeXAxis(), datasets: data},
		options: {
			scales: {
				xAxes: [{
					stacked: true
				}],
				yAxes: [{
					stacked: true
				}]
			}
		}
		})
	  });
  }
  
  makeXAxis() : string[] {
    let result: string[] = [];
	for(let i = this.yearStart ; i <= this.yearEnd ; i++) {
	  result.push(i.toString());
	}
	return result;
  }

  ngOnChanges(changes: SimpleChanges) {
    let hasChanged = false;
	
    if(changes.yearStart) {
	  this.yearStart = changes.yearStart.currentValue;
	  hasChanged = true;
	}
	
	if(changes.yearEnd) {
	  this.yearEnd = changes.yearEnd.currentValue;
	  hasChanged = true;
	}
	
	if(changes.oaci) {
	  this.oaci = changes.oaci.currentValue;
	  hasChanged = true;
	}
	
	if(hasChanged) {
	  this.drawGraphs();
	}
  }

}
