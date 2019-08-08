import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  // Url to access our Web API's
  private baseUrlLogin: string = 'https://localhost:44367/api/account/login';
  private baseUrlRegister: string = 'https://localhost:44367/api/account/register';

  // User related properties
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem("username"));
  private UserRole = new BehaviorSubject<string>(localStorage.getItem("userRole"));

  // Register Service
  register(username: string, password: string, email: string, fullname: string, phone: string) {
    return this.http.post<any>(this.baseUrlRegister, { username, password, email, fullname, phone }).pipe(
      map(
        result => {
          // Registration successful
          return result;
        },
        error => {
          console.log(error);
          return error;
        }
      )
    );
  }

  // Login Service
  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrlLogin, { username, password }).pipe(
      map(result => {
        if (result && result.token) {
          this.loginStatus.next(true);
          localStorage.setItem("loginStatus", "1");
          localStorage.setItem("jwt", result.token);
          localStorage.setItem("username", result.username);
          localStorage.setItem("expiration", result.expiration);
          localStorage.setItem("userRole", result.userRole);
        }

        return result;

      })
    );
  }

  // Logout Service
  logout() {
    this.loginStatus.next(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userRole");
    localStorage.setItem("loginStatus", "0");
    this.router.navigate(['/login']);
    console.log("logged Out Successfully");
  }

  checkLoginStatus(): boolean {
    return false;
  }

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }
}
