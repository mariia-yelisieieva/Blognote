import { Author } from './author.model';
import { ArticleBlock } from './article-block.model';

export class Article {
  constructor(public id: string,
    public name: string, public description: string,
     public author: Author, public articleBlocks: ArticleBlock[]) { }
}
