import { ArticleBlock } from './article-block.model';
import { ArticleBlockType } from './article-block-type.model';
import { TextArticleBlock } from './text-article-block.model';
import { ImageArticleBlock } from './image-article-block.model';
import { QuoteArticleBlock } from './quote-article-block.model';

export class ArticleBlockHelper {

  clone(block: ArticleBlock): ArticleBlock {
    let clonedBlock: ArticleBlock;
    switch (block.type) {
      case ArticleBlockType.Text:
        clonedBlock = new TextArticleBlock(block.id, block.order, block.content, block['name']);
        break;

      case ArticleBlockType.Image:
        clonedBlock = new ImageArticleBlock(block.id, block.order, block.content, block['imageComment']);
        break;

      case ArticleBlockType.Quote:
        clonedBlock = new QuoteArticleBlock(block.id, block.order, block.content, block['quoteAuthor']);
        break;
    }
    return clonedBlock;
  }

}
