import { Component, OnInit, Input } from '@angular/core';

import { ArticleBlock } from 'src/app/models/blocks/article-block.model';
import { ImageArticleBlock } from 'src/app/models/blocks/image-article-block.model';
import { ArticleBlockType } from 'src/app/models/blocks/article-block-type.model';
import { TextArticleBlock } from 'src/app/models/blocks/text-article-block.model';
import { QuoteArticleBlock } from 'src/app/models/blocks/quote-article-block.model';

@Component({
  selector: 'app-article-block',
  templateUrl: './article-block.component.html',
  styleUrls: ['./article-block.component.css']
})
export class ArticleBlockComponent implements OnInit {
  @Input() block: ArticleBlock;
  textBlock: TextArticleBlock;
  imageBlock: ImageArticleBlock;
  quoteBlock: QuoteArticleBlock;

  constructor() { }

  ngOnInit(): void {
    switch (this.block.type) {
      case ArticleBlockType.Text:
        this.textBlock = <TextArticleBlock>this.block;
        break;
      case ArticleBlockType.Image:
        this.imageBlock = <ImageArticleBlock>this.block;
        break;
      case ArticleBlockType.Quote:
        this.quoteBlock = <QuoteArticleBlock>this.block;
        break;
    }
  }

}
