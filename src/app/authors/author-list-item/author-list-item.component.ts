import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-author-list-item',
  templateUrl: './author-list-item.component.html',
  styleUrls: ['./author-list-item.component.css']
})
export class AuthorListItemComponent implements OnInit {
  @Input() author: Author;

  constructor() { }

  ngOnInit(): void {
  }

}
