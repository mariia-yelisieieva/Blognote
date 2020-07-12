import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators'

import { UserRegistration } from '../models/user.registration';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  success: boolean;
  error: string;
  userRegistration: UserRegistration = { name: "", email: "", password: "", confirmPassword: ""};
  submitted: boolean = false;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.spinner.show();

    this.authService.register(this.userRegistration)
      .pipe(finalize(() => {
        this.spinner.hide();
      }))
      .subscribe(
        result => {
          if (result) {
            this.success = true;
          }
        },
        error => {
          let route = this.router.config.find(r => r.path === 'error');
          route.data = { error: error.message };
          this.router.navigateByUrl('error');
        });
  }
}
