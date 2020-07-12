import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Author } from '../models/author.model';
import { AuthService } from '../authorization/services/auth.service';
import { ConfigService } from '../authorization/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  authorsChanged = new Subject<Author[]>();

  private authors: Author[] = [];

  constructor(private authService: AuthService, private http: HttpClient, private config: ConfigService,
    private router: Router) {
  }

  getAuthors(): Subscription {
    this.authors = [];
    return this.http
      .get(this.config.resourceApiURI + "/authors")
      .pipe(map(responceData => this.convertJsonToAuthors(<Array<any>>responceData)))
      .subscribe(authors => {
        this.authors = authors;
        this.updateAuthorList();
      }, error => {
        let route = this.router.config.find(r => r.path === 'error');
        route.data = { error: error.message };
        this.router.navigateByUrl('error');
      });
  }

  private convertJsonToAuthors(jsonArray: Array<any>){
    const authors: Array<Author> = [];
    for (const authorJson of jsonArray) {
      let author = new Author(authorJson.Id, authorJson.UserId, authorJson.Name, authorJson.ImageUrl, authorJson.Description);
      author.articlesCount = authorJson.ArticlesCount;
      authors.push(author)
    }
    return authors;
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
    return this.authService.isCurrentUser(id);
  }

  private updateAuthorList() {
    this.authorsChanged.next(this.authors.slice());
  }

  checkAuthors() {
    if (this.authors.length == 0)
      this.getAuthors();
  }

}
