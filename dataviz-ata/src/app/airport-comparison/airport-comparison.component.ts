import { Component, OnInit } from '@angular/core';
import { AirportListService } from 'app/airport-list.service';
import { AirportDescription } from 'app/app.component';

@Component({
  selector: 'app-airport-comparison',
  templateUrl: './airport-comparison.component.html',
  styleUrls: ['./airport-comparison.component.css']
})
export class AirportComparisonComponent implements OnInit {
  startYear: number;
  endYear: number;
  airport1: string;
  airport2: string;
  airports: AirportDescription[] = [];

  constructor(private listServ: AirportListService) { }

  ngOnInit() {
  // load airport list from service to populate selects
  }

}
