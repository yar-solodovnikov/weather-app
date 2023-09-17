import { Component } from '@angular/core';
import { DEFAULT_ALERT_MSG } from '../app.constants'
import { NotificationService } from './notification.service';
import { AlertType } from './notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  alert = {
    type: AlertType.success,
    message: DEFAULT_ALERT_MSG,
    hidden: true
  }
 
  constructor (private notification: NotificationService) {
    this.notification.alert.subscribe({
      next: newValue => { this.alert = newValue; setTimeout(() => { this.notification.alert.value.hidden = true }, 3000) }
    })
  }
}
