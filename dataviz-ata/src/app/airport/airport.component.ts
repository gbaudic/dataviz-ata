import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirportListService } from 'app/airport-list.service';
import { AirportDescriptionComponent} from 'app/airport-description/airport-description.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {
  currentAirport: AirportDescription;
  oaci: string;
  mymap: any;

  constructor(private airportList: AirportListService) { }

  ngOnInit() {
    this.mymap = L.map('mapid').setView([46.449, 2.210], 6); 
	// coordinates found on openstreetmap start page for full view of France

	L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'Donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1,
      maxZoom: 20
    }).addTo(this.mymap);
  
    // get list, create markers
	this.airportList.getList().subscribe(res => {
	  for (let ap of res) {
	    L.marker([ap.lat, ap.long],{title: `${ap.name.toTitleCase()} (${ap.oaci})`}).addTo(this.mymap)
		  .on('click',() => { this.oaci = ap.oaci; });
	  }
	});
  }

}

export class AirportDescription {
  oaci: string;
  iata: string;  // 3-letter
  name: string;
  country: string;
  lat: number;
  long: number;
  nb_destinations: number;
}
