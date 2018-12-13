import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  //Extract details from token for simple purposes. Use profile instead. 
  getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  logout(): void {
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  userProfile(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }
}