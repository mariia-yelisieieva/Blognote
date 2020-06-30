import { Component, OnInit, Input } from '@angular/core';
import { ArticleBlock } from 'src/app/models/article-block.model';
import { ImageArticleBlock } from 'src/app/models/image-article-block.model';
import { ArticleBlockType } from 'src/app/models/article-block-type.model';

@Component({
  selector: 'app-article-block',
  templateUrl: './article-block.component.html',
  styleUrls: ['./article-block.component.css']
})
export class ArticleBlockComponent implements OnInit {
  @Input() block: ArticleBlock;
  imageBlock: ImageArticleBlock;

  constructor() { }

  ngOnInit(): void {
    if (this.block.type == ArticleBlockType.Image) {
      this.imageBlock = <ImageArticleBlock>this.block;
    }
  }

}
