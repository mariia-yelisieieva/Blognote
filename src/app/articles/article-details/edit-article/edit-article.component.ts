import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';
import { AuthService } from 'src/app/authorization/services/auth.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  id: string;
  editMode: boolean;
  articleForm: FormGroup;

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
      const article = this.articlesService.getArticleById(this.id);
      this.creationDate = article.creationDate;

      articleName = article.name;
      articleAnnotation = article.annotation;
      if (article["blocks"]) {
        for (let block of article.articleBlocks) {
          // const contentControl = { 'name': new FormControl(block.content, Validators.required) };
          // articleBlocks.push(new FormGroup({

          // }));
        }
      }
    //       recipeIngredients.push(new FormGroup({
    //         'name': new FormControl(ingredient.name, Validators.required),
    //         'amount': new FormControl(ingredient.amount, [
    //           Validators.required,
    //           Validators.pattern(/^[1-9]+[0-9]*$/),
    //         ]),
    //       }))
    }

    this.articleForm = new FormGroup({
      'name': new FormControl(articleName, Validators.required),
      'annotation': new FormControl(articleAnnotation, Validators.required),
      'blocks': articleBlocks,
    });
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
