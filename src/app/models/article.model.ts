import { Author } from './author.model';
import { ArticleBlock } from './article-block.model';

export class Article {
  constructor(public id: string,
    public name: string, public annotation: string,
     public author: Author, public creationDate: Date, public articleBlocks: ArticleBlock[]) { }
}
