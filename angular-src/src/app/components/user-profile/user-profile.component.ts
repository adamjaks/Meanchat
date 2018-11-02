import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { PostsService } from "../../services/posts.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    user: Object;
    posts: Object;
    loggedUser: String;
    isBusy: Boolean;

    constructor(private authService: AuthService, private router: Router, private postsService: PostsService) {}

    ngOnInit() {
        this.isBusy = true;
        this.loggedUser = JSON.parse(localStorage.getItem('user')).id;
        this.postsService.getPosts().subscribe(response => {
            this.posts = response.posts.reverse();
        }),
        err => {
            console.log(err);
            return false;
        };

        this.authService.getProfile().subscribe(profile => {
           this.user = profile.user;
        }),
        err => {
            console.log(err);
            return false;
        };
    }

    ngAfterViewInit() {
        this.isBusy = false;
    }
}
