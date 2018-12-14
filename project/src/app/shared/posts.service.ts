import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})


export class PostsService {

  selectedPost: Post = {
    username: '',
    fullName: '',
    text: '',
    date: 0
  };

  constructor(private http: HttpClient) { }

  addPost(post: Post){
    return this.http.post(environment.apiBaseUrl+'/post',post);
  }
  getAllPosts() {
    return this.http.get(environment.apiBaseUrl+'/posts');

    
  }

  editPost(payload:{id: String, newtext: String}) {
    return this.http.post(environment.apiBaseUrl+'/editPost', payload);
  }

  deletePost(payload:{id: String}) {
    return this.http.post(environment.apiBaseUrl+'/deletePost', payload);
  }
}
