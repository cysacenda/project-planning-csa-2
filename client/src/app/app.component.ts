import {Component} from '@angular/core';
import {UIActionsService} from './shared/services/ui.actions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor(private uiActionsService: UIActionsService) {
  }
}
