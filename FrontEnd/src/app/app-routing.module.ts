import { MangasComponent } from './components/mangas/mangas.component';
import { AnimesDetailsComponent } from './components/animes-details/animes-details.component';
import { AnimesComponent } from './components/animes/animes.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: MainPageComponent},
  {path: 'animes', component: AnimesComponent},
  {path: 'animes/:id', component: AnimesDetailsComponent},
  {path: 'mangas', component: MangasComponent},
  //{path: 'mangas/:id', component: MangasDetailsComponent},
  {path: 'profile/:username', component: ProfileComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
