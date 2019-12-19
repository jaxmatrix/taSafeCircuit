import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {

  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: new FormControl(),
      productid: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit(value) {
    if (this.registrationForm.valid) {
      this.http.post('/control/registration', value).subscribe((response: any) => {
        console.log('Recieved Success', response);
        // add alert to send the message that registration was successful
      },
        (error) => {
          console.log('Registration Failed');
          // alert reason for failure for the registration
        }
      );
    } else {
      // alert "Enter the valid details"
      console.log('Invalid Details entered');
    }
  }

}
