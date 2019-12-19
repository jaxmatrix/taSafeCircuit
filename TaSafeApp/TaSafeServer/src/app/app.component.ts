import { Component } from '@angular/core';

import { LoginComponent} from './login/login.component';
import { RegisterComponent} from './register/register.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'TaSafeServer';
}
