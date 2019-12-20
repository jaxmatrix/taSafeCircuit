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
  errorMessage: string;
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
      this.errorMessage = 'Invalid Input';
      // Alert the people about the invalid form
    } else {
      this.errorLogin = false ;
      this.http.post('control/login', login).subscribe((response: any) => {
        console.log('Response for login', response);
        if (response.result === 'success') {
          console.log('Login Successful');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('sessionid', response.user.sessionid);
          localStorage.setItem('username', response.user.username);
          this.router.navigate([this.returnUrl]);
          this.errorMessage = '';
        } else {
          this.errorLogin = true;
          this.errorMessage = 'Invalid Credentials';
        }
      },
        (error) => {
          this.errorLogin = true;
          this.errorMessage = 'Connection to server lost';
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
