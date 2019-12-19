import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      login: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit(login) {
    console.log('Login Infomation Sent', login);
    this.http.post('control/login', login).subscribe((response: any) => {
      console.log('Response for login', response);
    },
      (error) => {
        console.log('Error Not found');
      }
    );
  }

  ngOnInit() {
  }

}
