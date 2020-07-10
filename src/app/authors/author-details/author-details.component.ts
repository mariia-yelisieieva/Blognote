import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthorsService } from 'src/app/services/authors.service';
import { Author } from 'src/app/models/author.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit, OnDestroy {
  selectedAuthor: Author;
  articlesByAuthor: Article[];
  isCurrentUser: boolean;

  private authorChangedSubscription: Subscription;

  constructor(private authorsService: AuthorsService, private articlesService: ArticlesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params["id"];
      this.authorChangedSubscription = this.authorsService.authorsChanged.subscribe(authors => this.selectAuthor(id))
      this.selectAuthor(id);
    });
  }

  ngOnDestroy(): void {
    this.authorChangedSubscription.unsubscribe();
  }

  onRemoveAuthor() {
    this.authorsService.removeAuthor(this.selectedAuthor.id);
  }

  private selectAuthor(id: string) {
    this.selectedAuthor = this.authorsService.getAuthorByUserId(id);
    if (this.selectedAuthor != undefined) {
      this.articlesByAuthor = this.articlesService.getArticlesByAuthor(this.selectedAuthor.id);
      this.isCurrentUser = this.authorsService.isCurrentUser(this.selectedAuthor.userId);
      return;
    }

    this.selectedAuthor = new Author("", "", "", "", "");
    this.articlesByAuthor = [];
    this.isCurrentUser = false;
  }

}
