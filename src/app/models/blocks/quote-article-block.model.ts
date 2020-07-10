import { ArticleBlock } from './article-block.model';
import { ArticleBlockType } from './article-block-type.model';

export class QuoteArticleBlock extends ArticleBlock {
  constructor(id: number, order: number, content: string, public quoteAuthor: string) {
    super(id, order, content, ArticleBlockType.Quote);
   }
}
