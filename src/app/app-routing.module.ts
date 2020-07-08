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

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "welcome", component: WelcomeComponent },

  { path: "register", component: RegisterComponent},
  { path: "login", component: LoginComponent},
  { path: "auth-callback", component: AuthCallbackComponent},

  { path: "articles", component: ArticleListComponent},
  { path: "articles/:id", component: ArticleDetailsComponent },
  { path: "authors", component: AuthorListComponent, children: [
    { path: "", children: [] },
    { path: ":id", component: AuthorDetailsComponent },
  ] },
  { path: "about", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
