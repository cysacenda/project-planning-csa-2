import {Component} from '@angular/core';
import {HeaderAction, UIActionsService} from '../services/ui.actions.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  monthNames: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private uiActionsService: UIActionsService) {
  }

  private today() {
    this.uiActionsService.actionTriggered(HeaderAction.Today);
  }

  private next() {
    this.uiActionsService.actionTriggered(HeaderAction.Next);
  }

  private previous() {
    this.uiActionsService.actionTriggered(HeaderAction.Previous);
  }

  private moveToNextWeek() {
    this.uiActionsService.actionTriggered(HeaderAction.MoveToNextWeek);
  }
}
