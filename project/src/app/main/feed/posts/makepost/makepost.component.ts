import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../shared/posts.service';
import { UserService } from '../../../../shared/user.service';

import { Post } from '../../../../shared/post.model';
import {Router} from '@angular/router';


import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-makepost',
  templateUrl: './makepost.component.html',
  styleUrls: ['./makepost.component.css']
})
export class MakepostComponent implements OnInit {

  currentPost:Post;

  

  constructor(private postsService: PostsService, private userService: UserService , private router: Router) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    this.currentPost= {
        username: this.userService.getUserDetails().username,
         fullName: this.userService.getUserDetails().fullName,
         text: form.value.text,
         date: Date.now()
        // ,image: form.value.image
         
    };
    
    this.postsService.addPost(this.currentPost).subscribe(
      
      res => {

          this.resetForm(form);
    
          this.refresh(); 

      },
      err => {
        if(err.status === 422) {
        }
        else {
        }
      }
    );
    
  
  }
  refresh(): void {
    window.location.reload();
}
  resetForm(form: NgForm) {
    console.log('')
    this.postsService.selectedPost = {
      username: '',
      fullName: '',
      text: '',
      date: 0
      //,image: null
    };
    form.resetForm();
  //  this.serverErrorMessages = '';
  }


}
