import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FeedComponent} from './components/feed/feed.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidationService } from './services/validation.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PostsService } from './services/posts.service';
import { LoginComponent } from './components/login/login.component';
import { AddPostComponent } from './components/add-post/add-post.component';

const appRoutes: Routes = [
    {path: '', component: FeedComponent},
    {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
    {path: 'post', component: PostDetailsComponent},
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
        PostDetailsComponent,
        RegisterComponent,
        LoginComponent,
        AddPostComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
],
providers: [ ValidationService, AuthService, AuthGuardService, PostsService ],
    bootstrap
:
[AppComponent]
})

export class AppModule {
}
