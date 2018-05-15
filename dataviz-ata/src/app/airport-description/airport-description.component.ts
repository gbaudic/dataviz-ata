import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AirportListService } from 'app/airport-list.service';
import { TrafficService, BarSeries } from 'app/traffic.service';
import { EmissionsService } from 'app/emissions.service';
import { AirportDescription } from 'app/airport/airport.component';
import { Chart } from 'chart.js';

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
  lastYear = 2016; // to make phase 2 more convenient
  
  // Chart objects
  flightsPerTypeChart: any;
  passengersPerYearChart: any;

  constructor(private description: AirportListService,
              private traffic: TrafficService,
			        private emissionsSrv: EmissionsService
             ) { }

  ngOnInit() {
    if(this.oaci) {
      // fetch description
      this.description.getAirportDescription(this.oaci).subscribe(desc => { 
        this.airport = desc; 
        setTimeout(() => { this.drawGraphs(); }, 0);

        // Fetch emissions
        this.emissionsSrv.getEmissions(this.oaci).subscribe(emi => { 
           this.emissions = emi; 
        });

        // Fetch top10
        this.traffic.getTop10(this.oaci).subscribe(res => { this.top10 = res; });
      });
    }
  }
  
  drawGraphs(): void {
    	// Fetch nb passengers and sum -> graphics
	this.traffic.getTraffic(this.oaci, 1990, this.lastYear).subscribe(data => {
	  // Compute sums
	  let sums: number[] = [];
	  sums = data[0].data;
	  for (let i = 1 ; i < data.length ; i++) {
	    for (let j = 0 ; j < data[i].data.length ; j++) {
			sums[j] += data[i].data[j];
		}
	  }
	  
	  this.lastPassengers = sums[sums.length -1];
	  
	  // todo: graph
	  this.passengersPerYearChart = new Chart('passengersPerYear',
	  {     type: 'line',
			data: {
				labels: ['1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004',
	'2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'],
				datasets: [{
					backgroundColor: 'rgb(54, 162, 235)',
					borderColor: 'rgb(54, 162, 235)',
					data: sums,
					fill: false,
				}]
			},
			options: {
				responsive: true,
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				legend: {
				  display: false
				}, 
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'Année'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'Valeur'
						}
					}]
				}
			}
		}
	  );
	});
	
		this.traffic.getFlights(this.oaci, this.lastYear, this.lastYear).subscribe(data => {
			let titles = [data[0].label, data[1].label, data[2].label];
			let values = [data[0].data[0], data[1].data[0], data[2].data[0]];
			
			this.flightsPerTypeChart = new Chart('flightsPerType',
			{
				type: 'doughnut',
				data: {
					datasets: [{
						data: values,
						backgroundColor: [
							'rgb(255, 205, 86)',
							'rgb(75, 192, 192)',
							'rgb(54, 162, 235)'
						],
						label: 'Dataset 1'
					}],
					labels: titles
				},
				options: {
					responsive: true,
					legend: {
						position: 'top',
					},
					animation: {
						animateScale: true,
						animateRotate: true
					}
				}
			}
			);
		});
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.oaci) {
	  this.oaci = changes.oaci.currentValue;
	  this.ngOnInit();
	}
  }

}
