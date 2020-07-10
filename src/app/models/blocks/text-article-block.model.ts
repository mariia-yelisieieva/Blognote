import { ArticleBlock } from './article-block.model';
import { ArticleBlockType } from './article-block-type.model';

export class TextArticleBlock extends ArticleBlock {
  constructor(id: number, order: number, content: string, public name: string) {
    super(id, order, content, ArticleBlockType.Text);
   }
}
