import { Author } from './author.model';
import { ArticleBlock } from './article-block.model';

export class Article {
  public articleBlocks: ArticleBlock[];

  constructor(public name: string, public author: Author) { }
}
