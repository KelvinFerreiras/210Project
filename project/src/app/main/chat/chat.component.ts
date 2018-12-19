import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

var i = 0
var mike = [];
for (var i = 0; i < 100; i++) { 
    mike.push(i);
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  array = mike;
  array2 = []; //Let's save this to local storage

  constructor(private userService: UserService) { 
  }

  ngOnInit(){
  }
  
  search(value: string){ 
    this.array2 = [];
 
    if(value != ""){
      this.userService.queryUsers(value, 100).subscribe(result => {
        console.log(result.users);
        for (var i of result.users) {
          if(i.username != this.userService.getUserDetails().username){
            var person = {fullName: i.fullName, username: i.username};
            this.array2.push(person);
          }
        }
      }, (err) => {
        console.error(err);
      });
    }
  }

  test(){
    this.array2.push(3);
  }

  addFriend(friend: string){ 
    this.userService.addFriend({username: this.userService.getUserDetails().username, newfriend: friend}).subscribe(result => {
      console.log(result);
    }, (err) => {
      console.error(err);
    });
  }

  getFriends(){
    this.userService.getFriends().subscribe(result => {
      console.log(result);
    }, (err) => {
      console.error(err);
    });
  }

  wipeFriends(){
    this.userService.wipeFriends().subscribe(result => {
      console.log(result);
    }, (err) => {
      console.error(err);
    });
  }
}




  