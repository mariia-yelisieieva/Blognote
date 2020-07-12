import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
import { ArticleBlockHelper } from 'src/app/models/blocks/block.helper';

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
  originalArticle: Article = this.article;

  author: Author;
  creationDate: Date = new Date();

  constructor(private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService,
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
    let articleBlocks = new FormArray([], Validators.required);

    if (this.editMode) {
      this.originalArticle = this.articlesService.getArticleById(this.id);
      this.cloneOriginalArticle();
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
      'id': new FormControl(this.article.id, Validators.required),
      'creationDate': new FormControl(this.article.creationDate, Validators.required),
      'name': new FormControl(articleName, Validators.required),
      'annotation': new FormControl(articleAnnotation, Validators.required),
      'articleBlocks': articleBlocks,
    });
  }

  private cloneOriginalArticle() {
    let blocks: ArticleBlock[] = [];
    let blockHelper = new ArticleBlockHelper();
    for (let block of this.originalArticle.articleBlocks) {
      blocks.push(blockHelper.clone(block));
    }
    this.article = new Article(this.originalArticle.id, this.originalArticle.name,
      this.originalArticle.annotation, this.originalArticle.creationDate, blocks);
      this.article.author = this.originalArticle.author;
  }

  private getBlockFormGroup(block: ArticleBlock): FormGroup {
    let blockFields = {
      'id': new FormControl(block.id),
      'order': new FormControl(block.order),
      'type': new FormControl(block.type),
      'content': new FormControl(block.content),
    };
    switch (block.type) {
      case ArticleBlockType.Text:
        blockFields['name'] = new FormControl((<TextArticleBlock>block).name);

      case ArticleBlockType.Image:
        blockFields['imageComment'] = new FormControl((<ImageArticleBlock>block).imageComment);

      case ArticleBlockType.Quote:
        blockFields['quoteAuthor'] = new FormControl((<QuoteArticleBlock>block).quoteAuthor);
    }
    return new FormGroup(blockFields);
  }

  get blockControls() {
    return (<FormArray>this.articleForm.get('articleBlocks')).controls;
  }

  onSubmit() {
    this.spinner.show();
    if (this.editMode) {
      this.articlesService.articlesChanged.subscribe(articles => {
        this.spinner.hide();
        this.navigateBack();
      }, error => {
        let route = this.router.config.find(r => r.path === 'error');
        route.data = { error: error.message };
        this.router.navigateByUrl('error');
      });
      this.articleForm.value.author = this.article.author;
      this.articlesService.updateArticle(this.articleForm.value);
    } else {
      // this.articlesService.addRecipe(this.article);
    }
  }

  onAddBlock(blockType: string) {
    let id = this.article.articleBlocks.length + 1;
    let block: ArticleBlock;
    switch (blockType) {
      case ArticleBlockType.Text:
        block = new TextArticleBlock(id, id, "", "");
        break;
      case ArticleBlockType.Image:
        block = new ImageArticleBlock(id, id, "", "");
        break;
      case ArticleBlockType.Quote:
        block = new QuoteArticleBlock(id, id, "", "");
        break;
    }
    this.article.articleBlocks.push(block);
    (<FormArray>this.articleForm.get('articleBlocks')).push(this.getBlockFormGroup(block));
  }

  onRemoveBlock(index: number) {
    (<FormArray>this.articleForm.get('articleBlocks')).removeAt(index);
    this.article.articleBlocks.splice(index, 1);
  }

  navigateBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
