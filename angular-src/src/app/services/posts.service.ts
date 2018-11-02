import {Injectable} from '@angular/core';
import { Http, Headers } from "@angular/http";

@Injectable()
export class PostsService {

    constructor(private http: Http) {
    }

    getPosts() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/posts/fetch', {headers: headers})
            .map(res => res.json());
    }

    addPost(post) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/posts/add', post, {headers: headers})
            .map(res => res.json());
    }

    deletePost(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`http://localhost:3000/posts/delete/${id}`,{headers: headers})
            .map(res => res.json());
    }

    editPost(id, content) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`http://localhost:3000/posts/edit/${id}`,
            {headers: headers, content: content})
            .map(res => res.json());
    }

}
