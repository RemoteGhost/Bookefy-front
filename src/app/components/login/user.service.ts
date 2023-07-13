import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../model/login-request";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {LoginResponse} from "../model/login-response";
import {SignupRequest} from "../model/signup-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = "api/user"

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.path + "/login", loginRequest).pipe(
      tap((response: LoginResponse) => console.log("Logged in successfully!")))
  }

  register(signupRequest: SignupRequest): Observable<any> {
    return this.http.post<any>(this.path + "/register", signupRequest).pipe(
      tap((response: any) => console.log("Account registered successfully!")))
  }
}
