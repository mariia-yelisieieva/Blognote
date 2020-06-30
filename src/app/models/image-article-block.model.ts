import { ArticleBlock } from './article-block.model';
import { ArticleBlockType } from './article-block-type.model';

export class ImageArticleBlock extends ArticleBlock {
  constructor(name: string, imageUrl: string, public imageComment: string) {
    super(name, imageUrl, ArticleBlockType.Image);
   }
}
