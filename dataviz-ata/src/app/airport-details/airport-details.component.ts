import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrafficService, BarSeries } from 'app/traffic.service';
import { EmissionsService } from 'app/emissions.service';
import { AirportListService } from 'app/airport-list.service';
import { Chart } from 'chart.js';
import { AirportDescription } from 'app/airport/airport.component';
import fontawesome from '@fortawesome/fontawesome';
import * as faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent implements OnInit {
  @Input() yearStart = 1990;
  @Input() oaci: string;
  @Input() yearEnd = 2018;
  @Input() showDatePicker = true; // to allow the component to be used alone or not
  private description: AirportDescription;

  @ViewChild('passengersCanvas') canvas1;
  @ViewChild('flightsCanvas') canvas2;

  passengersChart: any;
  flightsChart: any;

  constructor(private traffic: TrafficService,
    private emissions: EmissionsService,
    private airports: AirportListService,
    private route: ActivatedRoute) {
    fontawesome.library.add(faCalendarAlt);
  }

  ngOnInit() {
    this.oaci = this.route.snapshot.paramMap.get('oaci');

    if (this.oaci) {
      this.airports.getAirportDescription(this.oaci).subscribe(data => {
        this.description = data;
      });

      this.drawGraphs();
    }
  }

  drawGraphs(): void {
    this.traffic.getTraffic(this.oaci, this.yearStart, this.yearEnd).subscribe(
      data => {
        if (this.passengersChart) {
          this.passengersChart.data = { labels: this.makeXAxis(), datasets: data };
          this.passengersChart.update();
        } else {
          this.passengersChart = new Chart(this.canvas1.nativeElement,
            {
              type: 'bar',
              data: { labels: this.makeXAxis(), datasets: data },
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
      });

    this.traffic.getFlights(this.oaci, this.yearStart, this.yearEnd).subscribe(
      data => {
        if (this.flightsChart) {
          this.flightsChart.data = { labels: this.makeXAxis(), datasets: data };
          this.flightsChart.update();
        } else {
          this.flightsChart = new Chart(this.canvas2.nativeElement,
            {
              type: 'bar',
              data: { labels: this.makeXAxis(), datasets: data },
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
      });
  }

  /** Helper function to produce x year labels */
  makeXAxis(): string[] {
    let result: string[] = [];
    for (let i = this.yearStart; i <= this.yearEnd; i++) {
      result.push(i.toString());
    }
    return result;
  }

  ngOnChanges(changes: SimpleChanges) {
    let hasChanged = false;

    if (changes.yearStart) {
      this.yearStart = changes.yearStart.currentValue;
      hasChanged = true;
    }

    if (changes.yearEnd) {
      this.yearEnd = changes.yearEnd.currentValue;
      hasChanged = true;
    }

    if (changes.oaci) {
      this.oaci = changes.oaci.currentValue;
      hasChanged = true;
    }

    if (hasChanged) {
      this.drawGraphs();
    }
  }

}
