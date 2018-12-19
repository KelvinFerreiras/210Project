import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Observable } from 'rxjs';

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
  userQuery = []; 
  friendArray = {current: [], incoming: [], sent: []};
  friendList = [];
  tabSetting = "";

  constructor(private userService: UserService) { 
  }

  ngOnInit(){
    this.tabSetting = "current";

    this.userService.getFriends().subscribe(result => {
      this.friendArray = {current: [], incoming: [], sent: []};
      this.friendArray.current = result.current;
      this.friendArray.incoming = result.incoming;
      this.friendArray.sent = result.sent;
      this.friendList = this.friendArray.current;
      console.log(this.friendArray);
    }, (err) => {
      console.error(err);
    });
  }
  
  search(value: string){ 
    if(value != ""){
      this.userService.queryUsers(value, 100).subscribe(result => {
        this.userQuery = [];
        for (var i of result.users) {
          if(i.username != this.userService.getUserDetails().username){
            var person = {fullName: i.fullName, username: i.username};
            this.userQuery.push(person);
          }
        }
      }, (err) => {
        console.error(err);
      });
    }
  }

  addFriend(friend: string){ 
    this.userService.addFriend({username: this.userService.getUserDetails().username, newfriend: friend}).subscribe(result => {
      console.log(result);
    }, (err) => {
      console.error(err);
    });
  }

  clearFriends(){
    this.userService.clearFriends().subscribe(result => {
      console.log(result);
    }, (err) => {
      console.error(err);
    });
  }

  tabSelector(choice: string){
    this.tabSetting = choice;
    if(choice == "current"){
      this.friendList = this.friendArray.current;
    }else if(choice == "incoming"){
      this.friendList = this.friendArray.incoming;
    }else{
      this.friendList = this.friendArray.sent;
    }
  }

  // getFriends(){
  //   this.userService.getFriends().subscribe(result => {
  //     this.friendArray = {current: [], incoming: [], sent: []};
  //     this.friendArray.current = result.collection.current;
  //     this.friendArray.incoming = result.collection.incoming;
  //     this.friendArray.sent = result.collection.sent;
  //   }, (err) => {
  //     console.error(err);
  //   });
  // }
}




  