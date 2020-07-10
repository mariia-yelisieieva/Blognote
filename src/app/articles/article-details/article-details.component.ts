import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { ArticleBlockType } from 'src/app/models/blocks/article-block-type.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  article: Article;

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.article = this.articlesService.getArticleById(params["id"]);
    })
  }

  onRemoveArticle() {
    this.articlesService.removeArticle(this.article.id);
  }

}
