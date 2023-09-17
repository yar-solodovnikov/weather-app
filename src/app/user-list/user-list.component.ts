import { Component } from '@angular/core';
import { LocalServiceService } from '../services/local-service.service'
import { UserCard } from '../user-card/user-card';
import { USERS_LIST_KEY } from '../app.constants'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  usersList: Array<UserCard> = []

  constructor(private storage: LocalServiceService) {
    this.reloadUsers()
  }

  reloadUsers() {
    const users = this.storage.getData(USERS_LIST_KEY)
    this.usersList = JSON.parse(users || '[]')
  }
}
