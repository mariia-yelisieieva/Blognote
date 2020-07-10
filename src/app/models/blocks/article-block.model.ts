import { ArticleBlockType } from './article-block-type.model';

export class ArticleBlock {
  constructor(public id: number, public order: number, public content: string, public type: ArticleBlockType) { }
}
