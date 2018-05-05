import { Component, OnInit } from '@angular/core';
import { DescriptionService } from 'app/description.service';
import { TrafficService } from 'app/traffic.service';
import { AirportDescription } from 'app/app.component';
// todo chart.js

@Component({
  selector: 'app-airport-description',
  templateUrl: './airport-description.component.html',
  styleUrls: ['./airport-description.component.css']
})
export class AirportDescriptionComponent implements OnInit {
  airport: AirportDescription;

  constructor(private description: DescriptionService,
              private traffic: TrafficService) { }

  ngOnInit() {
  
  }

}
