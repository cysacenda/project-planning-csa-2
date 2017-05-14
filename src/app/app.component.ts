import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /*To be deleted ?*/
  links: any[] = [
    {name: 'Previous', ref: 'http://www.google.fr', icon: 'keyboard_arrow_left'},
    {name: 'Next', ref: 'http://www.yahoo.fr', icon: 'keyboard_arrow_right'} ,
  ];

  monthNames: any[] = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
}
