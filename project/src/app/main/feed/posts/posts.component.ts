import { Component, OnInit, Inject, HostListener} from '@angular/core';
import { PostsService } from '../../../shared/posts.service';
import { UserService } from '../../../shared/user.service';
import { Post } from '../../../shared/post.model';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgForm } from '@angular/forms';
import { DOCUMENT } from "@angular/platform-browser";


//import { ConsoleReporter } from 'jasmine';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts$: Object
  currentPostId: String
  currentPostText: String
  

  constructor(@Inject(DOCUMENT) private document: Document, private postsService: PostsService, private userService: UserService) { }

  isCurrentUsersPost(postUserName: String){

    return (this.userService.getUserDetails().username == postUserName);
  }

  setCurrentPostId(id:String){
    this.currentPostId= id;
  }

  getCurrentPostId(){
    return this.currentPostId;
  }

  preparePostTobeEdited(id:String, text:String){
    this.currentPostId= id;
    this.currentPostText= text;


  }

  ngOnInit() {

   
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts$ =JSON.parse(JSON.stringify(posts));

    });


  }


  edit_payload:{
    id: String;
    newText: String;
  }

  onSubmitEdit(form: NgForm) {


    this.edit_payload={
      id: this.currentPostId,
      newText:form.value.text
    }
    
    this.postsService.editPost( this.edit_payload ).subscribe(
      
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
  delete_payload:{
    id: String;
  }

  onSubmitDelete(form: NgForm) {


    this.delete_payload={
      id: this.currentPostId,
    }
    
    this.postsService.deletePost( this.delete_payload ).subscribe(
      
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
    this.edit_payload={
      id: "",
      newText:""
    };
    form.resetForm();
  }



  windowScrolled: boolean;
    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        } 
       else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }
    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }
}

