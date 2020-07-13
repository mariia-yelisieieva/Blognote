import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/authorization/services/auth.service';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  article: Article;
  articlesLoaded: boolean = false;
  editingMode: boolean = false;
  isCurrentUser: boolean;

  private articlesChangedSubscription: Subscription;

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService,
    private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      const id = params["id"];
      this.articlesChangedSubscription = this.articlesService.articlesChanged.subscribe(articles => {
        this.selectArticle(id);
        this.spinner.hide();
      });
      this.selectArticle(id);
    })
  }

  private selectArticle(id: string) {
    this.article = this.articlesService.getArticleById(id);
    if (this.article == undefined) {
      this.article = new Article("", "", "", new Date(), []);
      this.article.author = new Author("", "", "", "", "");
    } else {
      this.articlesLoaded = true;
      this.spinner.hide();
      this.isCurrentUser = this.authService.isCurrentUser(this.article.author.userId);
    }
  }

  ngOnDestroy(): void {
    this.articlesChangedSubscription.unsubscribe();
  }

  onRemoveArticle() {
    this.spinner.hide();
    this.articlesChangedSubscription = this.articlesService.articlesChanged.subscribe(articles => {
      this.spinner.hide();
    });
    this.articlesService.removeArticle(this.article.id);
  }

}
