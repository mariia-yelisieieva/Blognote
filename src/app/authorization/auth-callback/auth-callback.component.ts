import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthorsService } from 'src/app/services/authors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit, OnDestroy {

  private authorsChanged: Subscription;
  private authenticated: Subscription;

  constructor(private authService: AuthService, private authorsService: AuthorsService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.authorsChanged = this.authorsService.authorsChanged.subscribe(authors => {
      this.authenticated = this.authService.authNavStatus$.subscribe(isAuthenticated => {
        if (isAuthenticated) {
          if (!this.authorsService.isAuthorExists(this.authService.id)) {
            this.authorsService.authorsChanged.subscribe(authors => {
              this.navigateAway();
            });
            this.authorsService.createAuthor();
          } else {
            this.navigateAway();
          }
        } else {
          this.navigateAway();
        }
      });
      this.authService.completeAuthentication();
    });
    this.authorsService.getAuthors();
  }

  private navigateAway() {
    this.spinner.hide();
    this.router.navigate(['/articles']);
  }

  ngOnDestroy(): void {
    this.authorsChanged.unsubscribe();
    this.authenticated.unsubscribe();
  }

}
