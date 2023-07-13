import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "../model/login-request";
import {AuthenticationService} from "./authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginResponse} from "../model/login-response";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup =  this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  returnUrl: string = '/'

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
    if (this.authenticationService.getCurrentUserValue) {
      this.router.navigate(['/'])
    }
  }

  onSubmit() {
    if (this.loginForm?.invalid) {
      return;
    }
    const {username, password} = this.loginForm.value
    const loginRequest = new LoginRequest(username, password)
    console.log(loginRequest)
    this.authenticationService.login(loginRequest)
      .pipe(first())
      .subscribe((response: LoginResponse) => {
        console.log(response)
        this.router.navigate([this.returnUrl])
      }, (response: any) => {
        console.log(response)
        document.getElementById("errorText")!.innerHTML = "Incorrect username or password!"
      })
  }

  clearError() {
    document.getElementById("errorText")!.innerHTML = ""
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm?.controls[controlName].hasError(errorName);
  }
}
