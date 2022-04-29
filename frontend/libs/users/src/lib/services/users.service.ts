import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/users');
  }

  getUserById(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/users/' + id);
  }

  addUser(user: User): Observable<any> {
    return this.http.post('http://localhost:5000/api/v1/users/register', user);
  }

  updateUser(id: string, user: User): Observable<any> {
    return this.http.put('http://localhost:5000/api/v1/users/' + id, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete('http://localhost:5000/api/v1/users/' + id);
  }
}
