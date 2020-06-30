import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-author-header',
  templateUrl: './author-header.component.html',
  styleUrls: ['./author-header.component.css']
})
export class AuthorHeaderComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
