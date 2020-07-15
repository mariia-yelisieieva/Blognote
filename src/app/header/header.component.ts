import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authorization/services/auth.service';
import { AuthorsService } from '../services/authors.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  user: string;

  private subscription: Subscription;

  constructor(private authService: AuthService, private authorsService: AuthorsService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.authNavStatus$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.user = this.authService.name;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  onNewArticle() {
    if (this.authorsService.isAuthorExists(this.authService.id)) {
      this.router.navigate(['articles', 'new']);
    }
  }

  signOut() {
    this.authService.signout();
  }

}
