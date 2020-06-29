import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { ArticleBlockType } from 'src/app/models/article-block-type.model';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.css']
})
export class ArticleListItemComponent implements OnInit {
  @Input() article: Article;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
  }

  getBlocksCount(blockType: ArticleBlockType) {
    let i = 0;
    for (let block of this.article.articleBlocks) {
      if (block.type == blockType) {
        i++;
      }
    }
    return i;
  }

}
