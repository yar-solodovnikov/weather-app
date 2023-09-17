import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert, AlertType } from './notification';
import { DEFAULT_ALERT_MSG } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public alert = new BehaviorSubject<Alert>({
    type: AlertType.success,
    message: DEFAULT_ALERT_MSG,
    hidden: true
  })

}
