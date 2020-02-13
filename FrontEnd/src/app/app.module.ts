import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule} from './material-module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AnimesComponent } from './components/animes/animes.component';
import { AnimesDetailsComponent } from './components/animes-details/animes-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MangasComponent } from './components/mangas/mangas.component';
import { MangasDetailsComponent } from './components/mangas-details/mangas-details.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    MainPageComponent,
    AnimesComponent,
    AnimesDetailsComponent,
    ProfileComponent,
    MangasComponent,
    MangasDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    MatCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    FlexLayoutModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
