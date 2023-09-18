import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Coordinates, UserCard } from './user-card';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons';
import { Gender } from './user-card'
import { LocalServiceService } from '../services/local-service.service'
import { USERS_LIST_KEY } from '../app.constants'
import { NotificationService } from '../notification/notification.service'
import { AlertType } from '../notification/notification';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: UserCard = {}
  @Input() displayMode = false
  @Output() getWeather:EventEmitter<Coordinates> = new EventEmitter()
  @Output() reloadUsers:EventEmitter<Coordinates> = new EventEmitter()
  hideSave = false

  constructor(
    private storage: LocalServiceService,
    private notification: NotificationService
    ) {
  }

  onSave(user: UserCard) {
    const users = this.storage.getData(USERS_LIST_KEY)
    const dataToSave = JSON.parse(users || '[]')
    dataToSave.push(user)
    this.storage.saveData(USERS_LIST_KEY, JSON.stringify(dataToSave))
    this.notification.alert.next({
      message: 'User was saved',
      type: AlertType.success,
      hidden: false
    })
    this.hideSave = true
  }

  onDelete(user: UserCard) {
    const users = this.storage.getData(USERS_LIST_KEY)
    const dataToSearch = JSON.parse(users || '[]')
    const newUsersList: Array<UserCard> = []
    dataToSearch.forEach((_user: UserCard) => {
      if (_user?.id?.value != user.id?.value) {
        newUsersList.push(_user)
      }
    })
    this.storage.saveData(USERS_LIST_KEY, JSON.stringify(newUsersList))
    this.notification.alert.next({
      message: 'User was removed',
      type: AlertType.success,
      hidden: false
    })
    this.displayMode = false
    this.reloadUsers.emit()
  }

  onGetWeather(coordinates: Coordinates) {
    this.getWeather.emit(coordinates)
  }

  getIcon(gender: Gender) {
    switch (gender) {
      case Gender.female: {
        return faFemale
      }
      case Gender.male:
      default: {
        return faMale
      }
    }
  }
}
