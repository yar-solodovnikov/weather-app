import { Component, OnInit } from '@angular/core';
import { Coordinates, UserCard } from '../user-card/user-card';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: Array<UserCard> = []
  coordinates: Coordinates = {
    latitude: '0',
    longitude: '0'
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.users = user.results
    })
  }


  getWeather(coordinates: Coordinates) {
    this.coordinates = coordinates
    const el = document.getElementById('navbar')
    el?.scrollIntoView()
  }
}
