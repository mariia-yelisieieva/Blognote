import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthorsService } from 'src/app/services/authors.service';
import { Author } from 'src/app/models/author.model';
import { AuthService } from 'src/app/authorization/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  currentAuthor: Author;
  authorImageUrl: string;
  authorForm: FormGroup;

  private authorLoaded: Subscription;
  private validChecked: Subscription;
  private oldName: string;
  private defaultImageUrl = "assets/images/blognote_sm.png";

  constructor(private authService: AuthService, private authorsService: AuthorsService) { }

  ngOnInit(): void {
    this.createDummyForm();
    this.authorLoaded = this.authorsService.getAuthorByUserId(this.authService.id)
      .subscribe(author => {
        this.currentAuthor = author;
        this.oldName = author.name;
        this.initForm();
      });
  }

  private createDummyForm() {
    this.authorForm = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'imageUrl': new FormControl(null),
    });
  }

  private initForm() {
    let imageUrl: string = this.currentAuthor.imageUrl;
    if (imageUrl == this.defaultImageUrl) {
      imageUrl = "";
    }
    this.authorForm = new FormGroup({
      'id': new FormControl(this.currentAuthor.id, Validators.required),
      'userId': new FormControl(this.currentAuthor.userId, Validators.required),
      'name': new FormControl(this.currentAuthor.name, Validators.required),
      'description': new FormControl(this.currentAuthor.description),
      'imageUrl': new FormControl(imageUrl),
    });
    this.onUrlChange();
  }

  ngOnDestroy(): void {
    this.authorLoaded.unsubscribe();
    this.validChecked.unsubscribe();
  }

  onSubmit() {
    this.validChecked = this.authorsService.checkUniqueName(this.authorForm.value['name'], this.oldName)
      .subscribe(unique => {
        if (!unique) {
          return;
        }
        this.authorsService.updateAuthor(this.authorForm.value);
      });
  }

  onUrlChange() {
    if (!this.authorForm.value['imageUrl']) {
      this.authorImageUrl = this.defaultImageUrl;
      return;
    }

    if (this.authorForm.value['imageUrl'] == "") {
      this.authorImageUrl = this.defaultImageUrl;
    } else {
      this.authorImageUrl = this.authorForm.value['imageUrl'];
    }
  }

}
