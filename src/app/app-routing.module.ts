import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './authorization/register/register.component';
import { LoginComponent } from './authorization/login/login.component';
import { AuthCallbackComponent } from './authorization/auth-callback/auth-callback.component';

import { ArticleListComponent } from './articles/article-list/article-list.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { ArticleDetailsComponent } from './articles/article-details/article-details.component';
import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditArticleComponent } from './articles/article-details/edit-article/edit-article.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "welcome", component: WelcomeComponent },
  { path: "error", component: ErrorComponent },

  { path: "register", component: RegisterComponent},
  { path: "login", component: LoginComponent},
  { path: "auth-callback", component: AuthCallbackComponent},
  { path: "profile", component: AuthorDetailsComponent},

  { path: "articles", component: ArticleListComponent},
  { path: "articles/new", component: EditArticleComponent },
  { path: "articles/:id/edit", component: EditArticleComponent },
  { path: "articles/:id", component: ArticleDetailsComponent },

  { path: "authors", component: AuthorListComponent, children: [
    { path: "", children: [] },
    { path: ":id", component: AuthorDetailsComponent },
  ] },

  { path: "about", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
