import { Component, OnInit } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: Array<UserCard> = []
  user: UserCard = {
    location: {
      coordinates: {
        latitude: '0',
        longitude: '0'
      }
    }
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.users = user.results
    })
  }


  getWeather(user: UserCard) {
    this.user = user
    const el = document.getElementById('navbar')
    el?.scrollIntoView()
  }
}
