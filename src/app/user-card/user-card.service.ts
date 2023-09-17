import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCards } from './user-card';

@Injectable({
  providedIn: 'root'
})
export class UserCardService {
  private url = 'https://randomuser.me/api/'

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<UserCards> {
   return this.http.get<UserCards>(this.url)
  }
}
