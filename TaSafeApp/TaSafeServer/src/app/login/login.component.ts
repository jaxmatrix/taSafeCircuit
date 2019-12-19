import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../interface/login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm;
  returnUrl: string;
  errorLogin = false;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

  }

  onSubmit(login) {
    console.log('Login Infomation Sent', login);
    if (this.loginForm.invalid) {
      console.log('Value is invalid');
      this.errorLogin = true;
      // Alert the people about the invalid form
    } else {
      this.errorLogin = false ;
      this.http.post('control/login', login).subscribe((response: any) => {
        console.log('Response for login', response);
        console.log('Login Successful');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('sessionid', response.sessionid);
        localStorage.setItem('username', response.username);
        this.router.navigate([this.returnUrl]);
      },
        (error) => {
          this.errorLogin = true;
          console.log('Error Not found');
          console.log('Invalid Login');
        }
      );

    }

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)

    });

    this.returnUrl = '/dashboard';
    this.authService.logout();


  }

}
