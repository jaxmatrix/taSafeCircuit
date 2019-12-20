import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../../contact';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  userName: string;
  sessionid: string;
  contacts = [];
  newContact: string;
  newContactNumber: string;
  contactAdded = false;
  addedContact = { name: '', no: ''};
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.userName = localStorage.getItem('username');
    this.sessionid = localStorage.getItem('sessionid');
    this.getContacts();
  }


  addContact() {

    console.log('adding new contact', this.newContact, this.newContactNumber);
    this.http.post('/control/newNumber', {
      identifier: this.sessionid,
      name: this.newContact,
      no: this.newContactNumber
    }).subscribe((response: any) => {
      this.contactAdded = true;
      this.addedContact.name = this.newContact;
      this.addedContact.no = this.newContactNumber;
      this.newContact = '';
      this.newContactNumber = '';
      if ( response.result === 'success') {
        this.contacts.push(new Contact(this.addedContact.name, this.addedContact.no));
      } else {
        console.log('Error in adding Contact', response);
      }
    });
  }

  getContacts() {
    this.http.post('/control/contacts', { identifier: this.sessionid }).subscribe((response: any) => {
      console.log('Contacts', response);
      this.contacts = response.contacts;
    });
  }

  logout() {
    console.log('Logging Out');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
