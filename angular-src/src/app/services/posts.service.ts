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
}
