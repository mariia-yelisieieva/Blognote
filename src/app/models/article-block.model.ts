import { ArticleBlockType } from './article-block-type.model';

export class ArticleBlock {
  constructor(public name: string, public content: string, public type: ArticleBlockType) { }
}
