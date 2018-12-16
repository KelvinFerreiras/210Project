import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface UserDetails {
  _id: string;
  email: string;
  fullName: string;
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

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = localStorage.getItem('token');
    if(token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else {
      return null;
    }
  }

  //Get user data locally. 
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

  //Get user data from server.
  userProfile(): Observable<any>{
    // console.log({ headers: { Authorization: `Bearer ${this.getToken()}` }})
    return this.http.get(environment.apiBaseUrl + '/userProfile', { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }

  addFriend(payload: {username:String, newfriend:String}){
    return this.http.post(environment.apiBaseUrl+'/addFriend',payload);
  }

  deleteFriend(payload: {username:String, friendTOBeDeleted:String}){
    return this.http.post(environment.apiBaseUrl+'/deleteFriend',payload);
  }

  getFriends(payload: {username:String}) {
    return this.http.post( environment.apiBaseUrl+'/getFriends', payload);
  }

  queryUsers(searchString:string, limit:number): Observable<any> {
    // console.log({ headers: { searchString: searchString, limit: `${limit}` }})
    return this.http.get(environment.apiBaseUrl + '/queryUsers', { headers: { searchString: searchString, limit: `${limit}` }});
  }
}