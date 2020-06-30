import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { AuthorsService } from './authors.service';
import { ArticleBlock } from '../models/article-block.model';
import { ArticleBlockType } from '../models/article-block-type.model';
import { ImageArticleBlock } from '../models/image-article-block.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: Article[] = [
    new Article("1", "How to learn Angular", "several words about the article several words about the article several words about the article several words about the article several words about the article several words about the article several words about the article several words about the article several words about the article",
      this.authorsService.getAuthorById("1"), new Date(2019, 6, 18), [
      new ArticleBlock("Block 1",
          "Open any Angular guide and start practicing.",
          ArticleBlockType.Text),
      new ImageArticleBlock(null,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/500px-Angular_full_color_logo.svg.png",
        "Picture 1.1 - Angular Logo"),
      new ArticleBlock("Lorem ipsum block",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ArticleBlockType.Text),
      new ArticleBlock(null,
        "A wise saying here.",
        ArticleBlockType.Quote),
      new ArticleBlock("Thanks for reading",
          null,
          ArticleBlockType.Text),
    ]),
    new Article("123", "How to learn Angular 2.0", "several words about the article",
      this.authorsService.getAuthorById("1"), new Date(2019, 7, 18), [
      new ArticleBlock("Block 1",
          "Open any Angular guide and start practicing.",
          ArticleBlockType.Text),
      new ImageArticleBlock(null,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
        "Picture 2.1 - Angular Logo"),
      new ArticleBlock("Lorem ipsum block",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ArticleBlockType.Text),
      new ArticleBlock(null,
        "A wise saying here.",
        ArticleBlockType.Quote),
      new ArticleBlock("Thanks for reading",
          null,
          ArticleBlockType.Text),
    ]),
    new Article("2", "Romeo and Juliett", "several words about the article",
      this.authorsService.getAuthorById("2"), new Date(1519, 3, 23), [
      new ArticleBlock("Block 1",
          "Open any Angular guide and start practicing.",
          ArticleBlockType.Text),
      new ImageArticleBlock(null,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
        "Picture 1.1 - Not Angular Logo"),
      new ArticleBlock("Lorem ipsum block",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ArticleBlockType.Text),
      new ArticleBlock(null,
        "A wise saying here.",
        ArticleBlockType.Quote),
      new ArticleBlock("Thanks for reading",
          null,
          ArticleBlockType.Text),
    ]),
  ];

   constructor(private authorsService: AuthorsService) { }

   getArticles() {
    return this.articles.slice();
   }

   getArticleById(id: string) {
    for (let article of this.articles) {
      if (article.id == id)
        return article;
    }
   }

   getArticleCountByAuthor(authorId: string) {
    return this.getArticlesByAuthor(authorId).length;
   }

   getArticlesByAuthor(authorId: string): Article[] {
    let articles: Article[] = [];
    for (let article of this.articles) {
      if (article.author.id == authorId)
        articles.push(article);
    }
    return articles;
   }
}
