import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {PostsService} from "../../services/posts.service";
import {Router} from '@angular/router';

declare var M: any;

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
                    M.toast({html: data.msg, classes: 'deep-orange' });
                    this.postsService.getPosts().subscribe(response => {
                        this.posts = response.posts.reverse();
                        console.log(this.posts);
                    }),
                    err => {
                        M.toast({html: err });
                        return false;
                    };

                    this.router.navigate(['/']);
                } else {
                    M.toast({ html: data.msg });
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
                M.toast({html: data.msg, classes: 'deep-orange' });
                this.postsService.getPosts().subscribe(response => {
                    this.posts = response.posts.reverse();
                }),
                err => {
                    M.toast({html: err });
                    return false;
                };
            } else {
                M.toast({html: data.msg });
            }
        });
    }

}
