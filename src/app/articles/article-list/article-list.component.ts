import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[]

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articles = this.articlesService.getArticles();
  }

}
