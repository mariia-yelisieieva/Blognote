import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';
import { Subject } from 'rxjs';
import { AuthService } from '../authorization/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  authorsChanged = new Subject<Author[]>();

  private authors: Author[] = [
    new Author("e1b354c6-f0fc-4d34-a3e0-59e94b97ba95", "Mariia Yelisieieva",
      "https://instagram.fiev25-2.fna.fbcdn.net/v/t51.2885-19/s150x150/16122690_1824811327742461_5941039346420285440_a.jpg?_nc_ht=instagram.fiev25-2.fna.fbcdn.net&_nc_ohc=lofwS4JADh8AX-KVR3J&oh=2cbd7d371c255ca1926b835f74d8d764&oe=5F232AF0",
      "Software Developer"),
    new Author("2", "Mighty Author 2",
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg",
      "A mighty author"),
  ];

  constructor(private authService: AuthService) {

  }

  getAuthors() {
    return this.authors.slice();
  }

  getAuthorById(id: string) {
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

}
