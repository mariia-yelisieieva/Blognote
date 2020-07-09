import { Component, OnInit, Input } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Author } from 'src/app/models/author.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
  selectedAuthor: Author;
  articlesByAuthor: Article[];
  isCurrentUser: boolean;

  constructor(private authorsService: AuthorsService, private articlesService: ArticlesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedAuthor = this.authorsService.getAuthorById(params["id"]);
      this.articlesByAuthor = this.articlesService.getArticlesByAuthor(params["id"]);
      this.isCurrentUser = this.authorsService.isCurrentUser(this.selectedAuthor.id);
    });
  }

  onRemoveAuthor() {
    this.authorsService.removeAuthor(this.selectedAuthor.id);
  }

}
