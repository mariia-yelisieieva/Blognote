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
  isCurrentUser: boolean = false;

  private articleLoadedSubscription: Subscription;

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService,
    private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      const id = params["id"];
      this.selectArticle(id);
    })
  }

  private selectArticle(id: string) {
    this.articleLoadedSubscription = this.articlesService.getArticleById(id).subscribe(article => {
      this.article = article;
      this.articlesLoaded = true;
      this.spinner.hide();
      this.isCurrentUser = this.authService.isCurrentUser(this.article.author.userId);
    });
    if (!this.article) {
      this.article = new Article("", "", "", new Date(), []);
      this.article.author = new Author("", "", "", "", "");
    }
  }

  ngOnDestroy(): void {
    if (this.articleLoadedSubscription)
      this.articleLoadedSubscription.unsubscribe();
  }

  onRemoveArticle() {
    this.spinner.show();
    this.articleLoadedSubscription = this.articlesService.articlesChanged.subscribe(articles => {
      this.spinner.hide();
    });
    this.articlesService.removeArticle(this.article.id);
  }

}
