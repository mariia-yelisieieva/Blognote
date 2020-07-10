import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Author } from '../models/author.model';
import { AuthService } from '../authorization/services/auth.service';
import { ConfigService } from '../authorization/services/config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  authorsChanged = new Subject<Author[]>();

  private authors: Author[] = [];

  constructor(private authService: AuthService, private http: HttpClient, private config: ConfigService) {
  }

  getAuthors() {
    this.authors = [];
    this.http
      .get(this.config.resourceApiURI + "/authors")
      .pipe(map(responceData => {
        const authors: Array<Author> = [];
        for (const authorJson of <Array<any>>responceData) {
          let author = new Author(authorJson.Id, authorJson.UserId, authorJson.Name, authorJson.ImageUrl, authorJson.Description);
          author.articlesCount = authorJson.ArticlesCount;
          authors.push(author)
        }
        return authors;
      }))
      .subscribe(authors => {
        this.authors = authors;
        this.updateAuthorList();
      });
  }

  getAuthorByUserId(id: string) {
    this.checkAuthors();
    for (let author of this.authors) {
      if (author.userId == id)
        return author;
    }
  }

  getAuthorById(id: string) {
    this.checkAuthors();
    for (let author of this.authors) {
      if (author.id == id)
        return author;
    }
  }

  removeAuthor(id: string) {
    if (!this.isCurrentUser(id)) {
      return;
    }

    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i].id == id) {
        this.authors.splice(i, 1);
        this.updateAuthorList();
      }
    }
  }

  isCurrentUser(id: string): boolean {
    return id == this.authService.id;
  }

  private updateAuthorList() {
    this.authorsChanged.next(this.authors.slice());
  }

  private checkAuthors() {
    if (this.authors.length == 0)
      this.getAuthors();
  }

}
