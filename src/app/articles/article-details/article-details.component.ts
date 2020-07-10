import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  article: Article;

  private articlesChangedSubscription: Subscription;

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      const id = params["id"];
      this.articlesChangedSubscription = this.articlesService.articlesChanged.subscribe(articles => this.selectArticle(id))
      this.selectArticle(id);
    })
  }

  ngOnDestroy(): void {
    this.articlesChangedSubscription.unsubscribe();
  }

  private selectArticle(id: string) {
    this.article = this.articlesService.getArticleById(id);
    if (this.article == undefined) {
      this.article = new Article("", "", "", new Date(), []);
    } else {
      this.spinner.hide();
    }
  }

  onRemoveArticle() {
    this.articlesService.removeArticle(this.article.id);
  }

}
