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
    modalId: any;
    post_date: any;
    editModal: any;
    editModalInstance: any;
    contentEdited: any;

    constructor(private authService: AuthService, private postsService: PostsService,
                private router: Router) {

    }

    ngOnInit() {
        this.editModal = document.querySelector('#edit-modal');
        this.editModalInstance = M.Modal.init(this.editModal);

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
                    M.toast({html: `<i class="material-icons">check</i> ${data.msg}`, classes: 'white deep-orange-text' });
                    this.postsService.getPosts().subscribe(response => {
                        this.posts = response.posts.reverse();
                    }),
                    err => {
                        M.toast({html: `<i class="material-icons">close</i> ${err}`, classes: 'grey'});
                        return false;
                    };

                    this.router.navigate(['/']);
                } else {
                    M.toast({html: `<i class="material-icons">close</i> ${data.msg}`, classes: 'grey'});
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
                M.toast({html: `<i class="material-icons">check</i> ${data.msg}`, classes: 'white deep-orange-text' });
                this.postsService.getPosts().subscribe(response => {
                    this.posts = response.posts.reverse();
                }),
                err => {
                    M.toast({html: `<i class="material-icons">close</i> ${err}`, classes: 'grey'});
                    return false;
                };
            } else {
                M.toast({html: `<i class="material-icons">close</i> ${data.msg}`, classes: 'grey'});
            }
        });
    }

    onEditModalSubmit() {
        this.editModalInstance.close();
        this.postsService.editPost(this.modalId, this.contentEdited).subscribe(data => {
            if (data.success) {
                this.postsService.getPosts().subscribe(response => {
                    this.posts = response.posts.reverse();
                }),
                    err => {
                        M.toast({html: `<i class="material-icons">close</i> ${err}`, classes: 'grey'});
                        return false;
                    };
                M.toast({html: `<i class="material-icons">check</i> ${data.msg}`, classes: 'white deep-orange-text' });
            } else {

            }
        });
    }

    openEditModal(id, content) {
        this.editModalInstance.open();
        this.modalId = id;
        this.editModal.querySelector('#textarea-edit').value = content;
    }

}
