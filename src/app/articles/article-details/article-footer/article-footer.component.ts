import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-footer',
  templateUrl: './article-footer.component.html',
  styleUrls: ['./article-footer.component.css']
})
export class ArticleFooterComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
  }

  getBlocksCount(blockType: string) {
    let i = 0;
    for (let block of this.article.articleBlocks) {
      if (block.type == blockType) {
        i++;
      }
    }
    return i;
  }

}
