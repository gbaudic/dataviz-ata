import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TrafficService } from 'app/traffic.service';
import { EmissionsService } from 'app/emissions.service';
import { AirportListService } from 'app/airport-list.service';
// todo chart.js

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent implements OnInit {
  @Input() yearStart: number;
  @Input() oaci: string;
  @Input() yearEnd: string;
  @Input() showDatePicker = true;

  constructor(private traffic: TrafficService,
              private emissions: EmissionsService,
			  private airports: AirportListService) { }

  ngOnInit() {
  }
  
  ngOnChanges() {
  }

}
