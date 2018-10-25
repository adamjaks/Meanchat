import {Component, OnInit} from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { PostsService } from "../../services/posts.service";

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
    posts: Object;
    loggedUser: String;

    constructor(private authService: AuthService, private postsService: PostsService) {
    }

    ngOnInit() {
        this.loggedUser = JSON.parse(localStorage.getItem('user')).username;
        this.postsService.getPosts().subscribe(response => {
            this.posts = response.posts.reverse();
        }),
        err => {
            console.log(err);
            return false;
        };
    }



}
