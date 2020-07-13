import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators'

import { UserRegistration } from '../models/user.registration';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  success: boolean;
  error: string;
  userRegistration: UserRegistration = { name: "", email: "", password: "", confirmPassword: ""};
  submitted: boolean = false;

  private registered: Subscription;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.registered)
      this.registered.unsubscribe();
  }

  onSubmit() {
    this.spinner.show();

    this.registered = this.authService.register(this.userRegistration)
      .pipe(finalize(() => {
        this.spinner.hide();
      }))
      .subscribe(result => {
          if (result) this.success = true
      }, error => {
        let route = this.router.config.find(r => r.path === 'error');
        route.data = { error: error.message };
        this.router.navigateByUrl('error');
      });
  }
}
