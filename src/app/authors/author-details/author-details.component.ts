import { Component, OnInit, Input } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
  selectedAuthor: Author;

  constructor(private authorsService: AuthorsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedAuthor = this.authorsService.getAuthorById(params["id"]);
    });
  }
}
