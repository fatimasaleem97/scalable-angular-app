import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiBaseUrl;
  private headers= new HttpHeaders().set('content-type', 'application/json')
  
  constructor( private _http: HttpClient) { }

  public Login(user: User){   
    return this._http.post(`${this.baseUrl}/login`, user, { 'headers': this.headers });
  }

  public getUsers() {
    return this._http.get(`${this.baseUrl}/users`);
  }

  public GetUserById() {
    return this._http.get(`${this.baseUrl}/getUserById?UserId=${window.localStorage.getItem('uid')}`);
  }
}
