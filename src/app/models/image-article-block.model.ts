import { ArticleBlock } from './blocks/article-block.model';
import { ArticleBlockType } from './blocks/article-block-type.model';

export class ImageArticleBlock extends ArticleBlock {
  constructor(name: string, imageUrl: string, public imageComment: string) {
    super(name, imageUrl, ArticleBlockType.Image);
   }
}
