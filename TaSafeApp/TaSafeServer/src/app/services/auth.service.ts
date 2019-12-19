import { Injectable } from '@angular/core';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('sessionid');
  }
}
