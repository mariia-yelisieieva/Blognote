import { ArticleBlock } from './article-block.model';
import { ArticleBlockType } from './article-block-type.model';

export class ImageArticleBlock extends ArticleBlock {
  constructor(id: number, order: number, imageUrl: string, public imageComment: string) {
    super(id, order, imageUrl, ArticleBlockType.Image);
   }
}
