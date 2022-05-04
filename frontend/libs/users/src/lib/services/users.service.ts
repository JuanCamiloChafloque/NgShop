import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UsersFacade } from '../state/users.facade';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private usersFacade: UsersFacade,
    private cookie: CookieService
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      'http://localhost:5000/api/v1/users/login',
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/users/logout', {
      withCredentials: true,
    });
  }

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/users', {
      withCredentials: true,
    });
  }

  getLoggedInUser(): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/users/current', {
      withCredentials: true,
    });
  }

  getUserById(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/v1/users/' + id, {
      withCredentials: true,
    });
  }

  addUser(user: User): Observable<any> {
    return this.http.post('http://localhost:5000/api/v1/users/register', user, {
      withCredentials: true,
    });
  }

  updateUser(id: string, user: User): Observable<any> {
    return this.http.put('http://localhost:5000/api/v1/users/' + id, user, {
      withCredentials: true,
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete('http://localhost:5000/api/v1/users/' + id, {
      withCredentials: true,
    });
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  isTokenValid() {
    if (this.cookie.get('token')) {
      return true;
    } else {
      return false;
    }
  }

  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }
}
