import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {
  currentAirport: AirportDescription;

  constructor() { }

  ngOnInit() {
  }

}

export class AirportDescription {
  oaci: string;
  code: string;  // 3-letter - replace with correct name
  name: string;
  country: string;
  lat: number;
  long: number;
}
