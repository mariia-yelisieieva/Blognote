import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
import { Author } from 'src/app/models/author.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit, OnDestroy {
  authors: Author[]
  private authorsChangedSubscription: Subscription;

  constructor(private authorsService: AuthorsService) { }

  ngOnInit(): void {
    this.authorsChangedSubscription = this.authorsService.authorsChanged.subscribe((authors: Author[]) => {
      this.authors = authors;
    });
    this.authors = this.authorsService.getAuthors();
  }

  ngOnDestroy(): void {
    this.authorsChangedSubscription.unsubscribe();
  }

}
