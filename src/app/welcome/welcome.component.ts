import { Component, OnInit } from '@angular/core';

import { AuthService } from '../authorization/services/auth.service';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  name: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.name = this.authService.name;
    }
  }

}
