import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string;
  sessionid: string;
  contact = [];
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userName = localStorage.getItem('username');
    this.sessionid = localStorage.getItem('sessionid');
    this.contact = this.getContacts(this.sessionid);
  }

  getContacts(userid) {
    return [
      {name: 'dummy', no: 97865838, id: 1234},
    ];
  }

  logout() {
    console.log('Logging Out');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
