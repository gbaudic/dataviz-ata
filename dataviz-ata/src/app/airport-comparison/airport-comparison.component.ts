import { Component, OnInit } from '@angular/core';
import { AirportListService } from 'app/airport-list.service';
import { TrafficService } from 'app/traffic.service';
import { AirportDescription } from 'app/airport/airport.component';
import { AirportDetailsComponent } from 'app/airport-details/airport-details.component';
import fontawesome from '@fortawesome/fontawesome';
import * as faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt';

@Component({
  selector: 'app-airport-comparison',
  templateUrl: './airport-comparison.component.html',
  styleUrls: ['./airport-comparison.component.css']
})
export class AirportComparisonComponent implements OnInit {
  startYear: number = 1990;
  endYear: number = 2018;
  lastDataYear = 2018;
  airport1: string;
  airport2: string;
  airports: AirportDescription[] = [];
  airport1_top10: Array<[string, number]>;
  airport2_top10: Array<[string, number]>;
  selectedAirportsDescription: AirportDescription[] = [];

  constructor(private listServ: AirportListService,
    private top10Serv: TrafficService) {
    fontawesome.library.add(faCalendarAlt);
  }

  ngOnInit() {
    // load airport list from service to populate selects
    this.listServ.getAirportList().subscribe(res => {
      this.airports = res;
      this.selectedAirportsDescription.push(this.airports[0]);
      this.selectedAirportsDescription.push(this.airports[0]);
    });
  }

  findDescription(oaci: string): AirportDescription {
    for (let ap of this.airports) {
      if (ap.oaci === oaci) {
        return ap;
      }
    }
  }

  loadExtra(event: any, index: number) {
    this.selectedAirportsDescription[index - 1] = this.findDescription(event);

    this.top10Serv.getTop10(event).subscribe(res => {
      if (index == 1) {
        this.airport1_top10 = res;
      } else {
        this.airport2_top10 = res;
      }
    });
  }

}
