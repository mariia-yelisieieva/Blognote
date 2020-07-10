import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article } from '../models/article.model';
import { AuthorsService } from './authors.service';
import { ConfigService } from '../authorization/services/config.service';
import { ArticleBlock } from '../models/blocks/article-block.model';
import { ArticleBlockType } from '../models/blocks/article-block-type.model';
import { TextArticleBlock } from '../models/blocks/text-article-block.model';
import { ImageArticleBlock } from '../models/blocks/image-article-block.model';
import { QuoteArticleBlock } from '../models/blocks/quote-article-block.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  articlesChanged = new Subject<Article[]>();

  private articles: Article[] = [];

  constructor(private authorsService: AuthorsService, private http: HttpClient, private config: ConfigService) { }

  getArticles() {
    this.authorsService.checkAuthors();
    this.http
      .get(this.config.resourceApiURI + "/articles")
      .pipe(map(responceData => this.convertJsonToArticles(<Array<any>>responceData)))
      .subscribe(articles => {
        this.articles = articles;
        this.updateArticleList();
      });
  }

  private convertJsonToArticles(jsonArray: Array<any>){
    const articles: Array<Article> = [];
    for (const articleJson of jsonArray) {
      let blocks: Array<ArticleBlock> = [];
      for (const jsonBlock of articleJson.Blocks) {
        switch (jsonBlock.Type) {
          case ArticleBlockType.Text:
            blocks.push(new TextArticleBlock(jsonBlock.Id, jsonBlock.Order, jsonBlock.Content, jsonBlock.Name));
            break;
          case ArticleBlockType.Image:
            blocks.push(new ImageArticleBlock(jsonBlock.Id, jsonBlock.Order, jsonBlock.Content, jsonBlock.ImageComment));
            break;
          case ArticleBlockType.Quote:
            blocks.push(new QuoteArticleBlock(jsonBlock.Id, jsonBlock.Order, jsonBlock.Content, jsonBlock.QuoteAuthor));
            break;
        }
      }
      let article = new Article(articleJson.Id, articleJson.Name, articleJson.Annotation,
        articleJson.CreationDate, blocks);
      article.author = this.authorsService.getAuthorById(articleJson.AuthorId);
      articles.push(article)
    }
    return articles;
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

   private checkArticles() {
     if (this.articles.length == 0)
      this.getArticles();
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
}
