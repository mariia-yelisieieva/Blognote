import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authorization/services/auth.service';
import { AuthorsService } from '../services/authors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  user: string;

  constructor(private authService: AuthService, private authorsService: AuthorsService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.authNavStatus$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.user = this.authService.name;
    });
  }

  onNewArticle() {
    if (this.authorsService.isAuthorExists(this.authService.id)) {
      this.router.navigate(['articles', 'new']);
    } else {
      // TODO: navigate to create author
    }
  }

  signOut() {
    this.authService.signout();
  }

}
