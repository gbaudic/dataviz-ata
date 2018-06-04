import { Component } from '@angular/core';
import fontawesome from '@fortawesome/fontawesome';
import * as faPlane from '@fortawesome/fontawesome-free-solid/faPlane';
import * as faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle';
import * as faChartBar from '@fortawesome/fontawesome-free-solid/faChartBar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor() {
    fontawesome.library.add(faPlane);
    fontawesome.library.add(faInfoCircle);
    fontawesome.library.add(faChartBar);
  }
}
