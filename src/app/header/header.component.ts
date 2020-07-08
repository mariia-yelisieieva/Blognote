import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authorization/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  user: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authNavStatus$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.user = this.authService.name;
    });
  }

  signOut() {
    this.authService.signout();
  }

}
