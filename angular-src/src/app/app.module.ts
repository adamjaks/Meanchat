import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FeedComponent} from './components/feed/feed.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

const appRoutes: Routes = [
    {path: '', component: FeedComponent},
    {path: 'profile', component: UserProfileComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        NavbarComponent,
        FeedComponent,
        UserProfileComponent,
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
],
providers: [],
    bootstrap
:
[AppComponent]
})

export class AppModule {
}
