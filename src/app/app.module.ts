import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AccountComponent } from './components/account/account.component';
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './components/header/header.component';
import {AccountService} from "./services/account.service";
import { MainComponent } from './components/main/main.component';
import {CommonModule, NgOptimizedImage, PRECONNECT_CHECK_BLOCKLIST} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MovielistComponent } from './components/movielist/movielist.component';
import { MovieService } from './services/movie.service';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';


import { CreditsComponent } from './components/credits/credits.component';
import {NgxStarRatingModule} from "ngx-star-rating";
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './interceptors/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { SearchlistComponent } from './components/searchlist/searchlist.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';





const routes : Routes = [
  {path: '', component: MainComponent, children: [
    {path: '', component: MovielistComponent},
    {path: 'movie/:id', component: MovieDetailsComponent},
    {path: 'search/:query', component: SearchlistComponent}

  ],
},
  {path: 'account', component: AccountComponent, children: [
      {path: 'signin', component: SigninComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'profile', component: ProfileComponent,
    canActivate : [authGuard]
    },
    ]},
  {path :'demo', component: FooterComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    AccountComponent,
    HeaderComponent,
    MainComponent,
    MovielistComponent,
    MovieDetailsComponent,
    CreditsComponent,
    FooterComponent,
    ProfileComponent,
    LoaderComponent,
    SearchlistComponent
  ],
  imports: [
    RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' }),
    BrowserModule,
    HttpClientModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxStarRatingModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    InfiniteScrollModule
  ],
  providers: [AccountService,MovieService,LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://www.themoviedb.org'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
  
}
