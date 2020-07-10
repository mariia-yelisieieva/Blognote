import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { AuthorsService } from './authors.service';
import { ArticleBlock } from '../models/article-block.model';
import { ArticleBlockType } from '../models/article-block-type.model';
import { ImageArticleBlock } from '../models/image-article-block.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../authorization/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  articlesChanged = new Subject<Article[]>();

  private articles: Article[] = [];

   constructor(private authorsService: AuthorsService, private http: HttpClient, private config: ConfigService) { }

   getArticles() {
    this.articles = [];
    this.http
      .get(this.config.resourceApiURI + "/articles")
      .subscribe(responceData => {
        let array = <Array<any>>responceData;
        for (let article of array) {
          this.articles.push(new Article(article.Id, article.Name, article.Annotation,
            this.authorsService.getAuthorById(article.AuthorId),
            article.CreationDate, []))
        }
      });
    return this.articles;
   }

   getArticleById(id: string) {
    this.checkArticles();
    for (let article of this.articles) {
      if (article.id == id)
        return article;
    }
   }

   getArticlesByAuthor(authorId: string): Article[] {
    this.checkArticles();
    let articles: Article[] = [];
    for (let article of this.articles) {
      if (article.author.id == authorId)
        articles.push(article);
    }
    return articles;
   }

   removeArticle(id: string) {
    for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].id == id) {
        this.articles.splice(i, 1);
        this.updateArticleList();
      }
    }
   }

   private updateArticleList() {
     this.articlesChanged.next(this.articles.slice());
   }

   private checkArticles() {
     if (this.articles.length == 0)
      this.getArticles();
   }
}
