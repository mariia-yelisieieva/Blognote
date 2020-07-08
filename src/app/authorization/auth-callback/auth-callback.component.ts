import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.spinner.show();

    await this.authService.completeAuthentication();
    this.router.navigate(['/articles']);
  }

}
