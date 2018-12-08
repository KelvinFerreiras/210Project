import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../shared/posts.service';
import { Post } from '../../../shared/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts$: Object
  // posts$=[
  //   //new Post({"kelkft","Kelvin", "Ferreiras"}, {"Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World"},  {"2018-06-28T00:00:00.000Z"}),
  //   new Post("kelkft","Kelvin", "Ferreiras", "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World",  "2018-06-28T00:00:00.000Z"),
  //   new Post("kelkft","Kelvin", "Ferreiras", "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World",  "2018-06-28T00:00:00.000Z"),
  //   new Post("kelkft","Kelvin", "Ferreiras", "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World",  "2018-06-28T00:00:00.000Z"),
  //   new Post("kelkft","Kelvin", "Ferreiras", "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World",  "2018-06-28T00:00:00.000Z"),
  //   new Post("kelkft","Kelvin", "Ferreiras", "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World",  "2018-06-28T00:00:00.000Z")

  // ]

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    console.log("hola");

    //this.posts$= "{\"user\": {\"username\": \"kelkft\",\"firstName\": \"Kelvin\",\"lastName\": \"Ferreiras\"},\"content\": {\"text\": \"Hello World\"},\"details\": {\"date\": \"2018-06-25T00:00:00.000Z\"}}"
    // this.posts$= [
    //   {"user": {"username": "kelkft","firstName": "Kelvin","lastName": "Ferreiras"},"content": {"text": "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World"},"details": {"date": "2018-06-28T00:00:00.000Z"}},
    //   {"user": {"username": "hjotot","firstName": "John","lastName": "Doe"},"content": {"text": "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World"},"details": {"date": "2018-07-11T00:00:00.000Z"}},
    //   {"user": {"username": "kfkkfk","firstName": "Jane","lastName": "Doe"},"content": {"text": "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World"},"details": {"date": "2018-08-12T00:00:00.000Z"}},
    //   {"user": {"username": "hdfood","firstName": "Charlie","lastName": "Brown"},"content": {"text": "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World"},"details": {"date": "2018-09-13T00:00:00.000Z"}},
    //   {"user": {"username": "gjkfkfo","firstName": "Hommer","lastName": "Simpson"},"content": {"text": "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World"},"details": {"date": "2018-03-25T00:00:00.000Z"}},
    //   {"user": {"username": "kfkkfkf","firstName": "Jose","lastName": "Perez"},"content": {"text": "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World"},"details": {"date": "2018-05-21T00:00:00.000Z"}},
    //   {"user": {"username": "uuyutur","firstName": "Maria","lastName": "Jones"},"content": {"text": "Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World"},"details": {"date": "2018-09-01T00:00:00.000Z"}}
    // ]
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts$ =JSON.parse(JSON.stringify(posts));

      //this.posts$ = JSON.parse(JSON.stringify(posts));
    });


   // console.log(this.posts$[0].user.username)

  }

}
