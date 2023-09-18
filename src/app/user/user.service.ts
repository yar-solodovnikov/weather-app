import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCards } from '../user-card/user-card'
import { environment } from '../../environments/environment';
import { DEFAULT_USERS_COUNT_BY_REQUEST } from '../app.constants'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.userAPIUrl

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<UserCards> {
   return this.http.get<UserCards>(`${this.url}?results=${DEFAULT_USERS_COUNT_BY_REQUEST}`)
  }
}
