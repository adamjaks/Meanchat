import {Component, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import { PostsService } from "../../services/posts.service";

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
    content: String;

    constructor(private http: Http, private router: Router, private authService: AuthService,
                private postsService: PostsService) {}

    ngOnInit() {
    }

    addPost(post) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/posts/add', post, {headers: headers})
            .map(res => res.json());
    }

    onAddPostSubmit() {
        if (this.authService.loggedIn()) {
            const post = {
                content: this.content,
                creator_username: JSON.parse(localStorage.getItem('user')).username,
                rate: 0
            };

            this.addPost(post).subscribe(data => {
                if (data.success) {
                    console.log('Post added');
                    this.router.navigate(['/']);
                } else {
                    console.log('Post not added'+ JSON.stringify(data));
                    this.router.navigate(['/']);
                }
            });
        } else {
            console.log('Not logged');
            return false;
        }


    }
}
