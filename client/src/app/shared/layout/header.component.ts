import {Component} from '@angular/core';
import {HeaderService, HeaderServiceAction} from '../services/header.service';

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

  private today() {
    this.headerService.actionTriggered(HeaderServiceAction.Today);
  }

  private next() {
    this.headerService.actionTriggered(HeaderServiceAction.Next);
  }

  private previous() {
    this.headerService.actionTriggered(HeaderServiceAction.Previous);
  }
}
