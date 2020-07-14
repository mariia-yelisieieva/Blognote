import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Author } from '../models/author.model';
import { AuthService } from '../authorization/services/auth.service';
import { ConfigService } from '../authorization/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService implements OnDestroy {
  authorsChanged = new Subject<Author[]>();

  private authors: Author[] = [];

  constructor(private authService: AuthService, private http: HttpClient, private config: ConfigService,
    private router: Router) {
  }

  ngOnDestroy(): void {
    this.authorsLoaded.unsubscribe();
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

  private authorsLoaded: Subscription;
  getAuthorByUserId(id: string): Observable<Author> {
    const authorObs = new Observable<Author>((observer) => {
      this.authorsLoaded = this.authorsChanged.subscribe(articles => {
        for (let author of this.authors) {
          if (author.userId == id) {
            observer.next(author);
            break;
          }
        }
      })
      this.checkAuthors();
      for (let author of this.authors) {
        if (author.userId == id) {
          observer.next(author);
          break;
        }
      }
    });
    return authorObs;
  }

  getAuthorById(id: string) {
    this.checkAuthors();
    for (let author of this.authors) {
      if (author.id == id)
        return author;
    }
  }

  createAuthor() {
    this.checkAuthors();
    if (!this.authService.isAuthenticated()) {
      return;
    }

    const authorToCreate = {
      UserId: this.authService.id,
      Name: this.authService.name,
      Description: "",
      ImageUrl: "assets/images/blognote_sm.png",
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.authorizationHeaderValue
      })
    };
    this.http
      .post(this.config.resourceApiURI + "/authors/create", authorToCreate, httpOptions)
      .subscribe(responce => {
        const id = <string>responce;
        this.authors.push(new Author(id, this.authService.id, this.authService.name, "assets/images/blognote_sm.png", ""));
        this.updateAuthorList();
      }, error => {
        let route = this.router.config.find(r => r.path === 'error');
        route.data = { error: error.message };
        this.router.navigateByUrl('error');
      });
  }

  isCurrentUser(id: string): boolean {
    return this.authService.isCurrentUser(id);
  }

  isAuthorExists(userId: string) {
    return this.authors.some(author => author.userId == userId);
  }

  private updateAuthorList() {
    this.authorsChanged.next(this.authors.slice());
  }

  checkAuthors() {
    if (this.authors.length == 0)
      this.getAuthors();
  }

}
