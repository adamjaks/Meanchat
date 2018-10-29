import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {PostsService} from "../../services/posts.service";
import {Router} from '@angular/router';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
    posts: any;
    loggedUser: any;
    content: any;
    post_date: any;

    constructor(private authService: AuthService, private postsService: PostsService,
                private router: Router) {

    }

    ngOnInit() {
        this.loggedUser = localStorage.getItem('user') ?
            JSON.parse(localStorage.getItem('user')).id : '';

        this.postsService.getPosts().subscribe(response => {
            this.posts = response.posts.reverse();
        }),
        err => {
            console.log(err);
            return false;
        };

        this.postsService.getPosts().subscribe(response => {
                this.posts = response.posts.reverse();
        }),
        err => {
            console.log(err);
            return false;
        };
    }

    onAddPostSubmit() {
        if (this.authService.loggedIn()) {
            const post = {
                content: this.content,
                creator_id: JSON.parse(localStorage.getItem('user')).id,
                creator_name: JSON.parse(localStorage.getItem('user')).name,
                post_date: Date.now(),
                rate: 0
            };
            this.postsService.addPost(post).subscribe(data => {
                if (data.success) {
                    console.log('Post added', post);
                    this.postsService.getPosts().subscribe(response => {
                        this.posts = response.posts.reverse();
                        console.log(this.posts);
                    }),
                    err => {
                        console.log(err);
                        return false;
                    };

                    this.router.navigate(['/']);
                } else {
                    console.log('Post not added' + JSON.stringify(data));
                    this.router.navigate(['/']);
                }
            });
        } else {
            console.log('Not logged');
            return false;
        }
    }

    deletePost(id) {
        this.postsService.deletePost(id).subscribe(data => {
            if (data.success) {
                console.log('Post succesfully deleted');
                this.postsService.getPosts().subscribe(response => {
                    this.posts = response.posts.reverse();
                }),
                err => {
                    console.log(err);
                    return false;
                };
            } else {
                console.log('Post not deleted');
            }
        });
    }

}
