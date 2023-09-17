import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCards } from './user-card'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCardService {
  private url = environment.userAPIUrl

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<UserCards> {
   return this.http.get<UserCards>(this.url)
  }
}
