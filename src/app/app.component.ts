import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.html'],
})
export class AppComponent {

  constructor(activateRoute: ActivatedRoute) {
    activateRoute.params.subscribe(console.log);
  }

}
