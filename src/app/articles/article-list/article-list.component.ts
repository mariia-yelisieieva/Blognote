import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  articles: Article[]
  filter: string;
  private articlesChangedSubscription: Subscription;

  constructor(private articlesService: ArticlesService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.articlesChangedSubscription = this.articlesService.articlesChanged.subscribe(articles => {
      this.articles = articles;
      this.spinner.hide();
    })
    this.articlesService.getArticles();
  }

  ngOnDestroy(): void {
    this.articlesChangedSubscription.unsubscribe();
  }

}
