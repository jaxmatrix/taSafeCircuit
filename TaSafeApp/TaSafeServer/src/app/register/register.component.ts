import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm;
  errorRegistration = false;
  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {

  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      productid: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    if (this.registrationForm.invalid) {
      // alert "Enter the valid details"
      console.log('Invalid Details entered');
      this.errorRegistration = true;
      this.errorMessage = 'Incomplete or Incorrect Details';
    } else {
      this.errorRegistration = false;
      this.errorMessage = '';
      this.http.post('/control/registration', value).subscribe((response: any) => {
        console.log('Recieved', response);
        // add alert to send the message that registration was successful
        if ( response.result === 'failed') {
          this.errorMessage = 'User already exist';
          this.errorRegistration = true;
        }
      },
        (error) => {
          console.log('Registration Failed');
          // alert reason for failure for the registration
        }
      );
    }
  }

}
