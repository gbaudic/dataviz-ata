import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TrafficService } from 'app/traffic.service';
import { EmissionsService } from 'app/emissions.service';
import { AirportListService } from 'app/airport-list.service';
import Chart from 'chart.js';

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
			  private airports: AirportListService) { }

  ngOnInit() {
  
    this.passengersChart = new Chart('passengers',
	{
    type: 'bar',
    data: data,
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
    });
  }
  
  ngOnChanges(changes: SimpleChanges) {
  
  }

}
