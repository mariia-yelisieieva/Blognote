import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleListComponent } from './articles/article-list/article-list.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { ArticleDetailsComponent } from './articles/article-details/article-details.component';


const routes: Routes = [
  { path: "", redirectTo: "/articles", pathMatch: "full" },
  { path: "articles", component: ArticleListComponent},
  { path: "articles/:id", component: ArticleDetailsComponent },
  { path: "authors", component: AuthorListComponent, children: [
    { path: "", children: [] },
    { path: ":id", component: AuthorDetailsComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
