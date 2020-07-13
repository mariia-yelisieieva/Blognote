import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  error: string;

  private subscription: Subscription

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      if (data['error'])
        this.error = <string>data['error'];
    });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
