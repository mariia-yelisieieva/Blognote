import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  authorsChanged = new Subject<Author[]>();

  private authors: Author[] = [
    new Author("1", "Mariia Yelisieieva",
      "https://instagram.fiev25-2.fna.fbcdn.net/v/t51.2885-19/s150x150/16122690_1824811327742461_5941039346420285440_a.jpg?_nc_ht=instagram.fiev25-2.fna.fbcdn.net&_nc_ohc=lofwS4JADh8AX-KVR3J&oh=2cbd7d371c255ca1926b835f74d8d764&oe=5F232AF0",
      "Software Developer"),
    new Author("2", "Mighty Author 2",
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg",
      "A mighty author"),
  ];

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
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i].id == id) {
        this.authors.splice(i, 1);
        this.updateAuthorList();
      }
    }
  }

  private updateAuthorList() {
    this.authorsChanged.next(this.authors.slice());
  }

}
