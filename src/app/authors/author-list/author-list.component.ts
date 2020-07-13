import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
import { Author } from 'src/app/models/author.model';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit, OnDestroy {
  authors: Author[]
  private authorsChangedSubscription: Subscription;

  constructor(private authorsService: AuthorsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.authorsChangedSubscription = this.authorsService.authorsChanged.subscribe((authors: Author[]) => {
      this.authors = authors;
      this.spinner.hide();
    });
    this.authorsService.getAuthors();
  }

  ngOnDestroy(): void {
    if (this.authorsChangedSubscription)
      this.authorsChangedSubscription.unsubscribe();
  }

}
