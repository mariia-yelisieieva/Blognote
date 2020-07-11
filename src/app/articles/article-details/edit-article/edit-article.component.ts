import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';
import { AuthService } from 'src/app/authorization/services/auth.service';
import { ArticleBlock } from 'src/app/models/blocks/article-block.model';
import { ArticleBlockType } from 'src/app/models/blocks/article-block-type.model';
import { TextArticleBlock } from 'src/app/models/blocks/text-article-block.model';
import { ImageArticleBlock } from 'src/app/models/blocks/image-article-block.model';
import { QuoteArticleBlock } from 'src/app/models/blocks/quote-article-block.model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  id: string;
  editMode: boolean;
  articleForm: FormGroup;
  article: Article = new Article("", "", "", new Date(), []);

  author: Author;
  creationDate: Date = new Date();

  constructor(private route: ActivatedRoute, private router: Router,
    private articlesService: ArticlesService, private authorsService: AuthorsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.author = this.authorsService.getAuthorByUserId(this.authService.id);
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editMode = this.id != null;
      this.initForm();
    });
  }

  private initForm() {
    let articleName = "";
    let articleAnnotation = "";
    let articleBlocks = new FormArray([]);

    if (this.editMode) {
      this.article = this.articlesService.getArticleById(this.id);
      this.creationDate = this.article.creationDate;

      articleName = this.article.name;
      articleAnnotation = this.article.annotation;
      if (this.article["articleBlocks"]) {
        for (let block of this.article.articleBlocks) {
          articleBlocks.push(this.getBlockFormGroup(block));
        }
      }
    }

    this.articleForm = new FormGroup({
      'name': new FormControl(articleName, Validators.required),
      'annotation': new FormControl(articleAnnotation, Validators.required),
      'blocks': articleBlocks,
    });
  }

  private getBlockFormGroup(block: ArticleBlock): FormGroup {
    switch (block.type) {
      case ArticleBlockType.Text:
        return new FormGroup({
          'content': new FormControl(block.content, Validators.required),
          'name': new FormControl((<TextArticleBlock>block).name),
        });

      case ArticleBlockType.Image:
        return new FormGroup({
          'content': new FormControl(block.content, Validators.required),
          'imageComment': new FormControl((<ImageArticleBlock>block).imageComment, Validators.required),
        });

      case ArticleBlockType.Quote:
        return new FormGroup({
          'content': new FormControl(block.content, Validators.required),
          'quoteAuthor': new FormControl((<QuoteArticleBlock>block).quoteAuthor),
        });
    }
  }

  get blockControls() {
    return (<FormArray>this.articleForm.get('blocks')).controls;
  }

  onSubmit() {
    // if (this.editMode) {
    //   this.recipeService.updateRecipe(this.recipeForm.value, this.id);
    // } else {
    //   this.recipeService.addRecipe(this.recipeForm.value);
    // }
    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
