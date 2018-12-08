import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../shared/posts.service';
import { Post } from '../../../../shared/post.model';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-makepost',
  templateUrl: './makepost.component.html',
  styleUrls: ['./makepost.component.css']
})
export class MakepostComponent implements OnInit {

  hola:Post;

  

  constructor(private postsService: PostsService ) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    this.hola= {
        username: 'Username-Test-'+Date.now(),
         fullName: 'FullName-Test',
         text: form.value.text
    };
    
    this.postsService.addPost(this.hola).subscribe(
      res => {
     //   this.showSucessMessage = true;
      //  setTimeout(() => this.showSucessMessage = false, 4000);
      //  this.resetForm(form);
      },
      err => {
        if(err.status === 422) {
       //   this.serverErrorMessages = err.error.join('<br />');
        }
        else {
//this.serverErrorMessages = 'Something went wrong. Please try again later.'
        }
      }
    );
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    console.log('')
    this.postsService.selectedPost = {
      username: '',
      fullName: '',
      text: ''
    };
    form.resetForm();
  //  this.serverErrorMessages = '';
  }


}
