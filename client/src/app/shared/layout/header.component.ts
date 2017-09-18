import {Component} from '@angular/core';
import {HeaderService} from '../services/header.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  monthNames: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private headerService: HeaderService) {
  }

  private next() {
    this.headerService.announceMission('TOTO');
  }

  private previous() {
    this.headerService.announceMission('TOTO');
  }

  // TODO : Function appelée par HMTL qui appelle une fonction du service this.headerService
}
