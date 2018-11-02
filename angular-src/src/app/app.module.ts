import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FeedComponent} from './components/feed/feed.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidationService } from './services/validation.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PostsService } from './services/posts.service';
import { LoginComponent } from './components/login/login.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const appRoutes: Routes = [
    {path: '', component: FeedComponent},
    {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        NavbarComponent,
        FeedComponent,
        UserProfileComponent,
        RegisterComponent,
        LoginComponent,
        TimeAgoPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        InfiniteScrollModule
],
providers: [ ValidationService, AuthService, AuthGuardService, PostsService ],
    bootstrap
:
[AppComponent]
})

export class AppModule {
}
