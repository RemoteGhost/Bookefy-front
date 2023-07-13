import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../login/authentication.service";
import {first} from "rxjs/operators";
import {LoginResponse} from "../model/login-response";
import {UserService} from "../login/user.service";
import {SignupRequest} from "../model/signup-request";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup =  this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  returnUrl: string = '/'

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.getCurrentUserValue) {
      this.router.navigate(['/'])
    }
  }

  onSubmit() {
    if (this.signupForm?.invalid) {
      return;
    }
    const {username, password} = this.signupForm.value
    const signupRequest = new SignupRequest(username, password)
    console.log(signupRequest)
    this.userService.register(signupRequest)
      .pipe(first())
      .subscribe((response: any) => {
        this.router.navigate(['/login'])
      }, (response: any) => {
        console.log(response)
        document.getElementById("errorText")!.innerHTML = "Username already taken!"
      })
  }

  clearError() {
    document.getElementById("errorText")!.innerHTML = ""
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.signupForm?.controls[controlName].hasError(errorName);
  }

}
