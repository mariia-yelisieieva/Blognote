import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  articles: Article[]
  filter: string;
  private articlesChangedSubscription: Subscription;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesChangedSubscription = this.articlesService.articlesChanged.subscribe(articles => {
      this.articles = articles;
    })
    this.articles = this.articlesService.getArticles();
  }

  ngOnDestroy(): void {
    this.articlesChangedSubscription.unsubscribe();
  }

}
