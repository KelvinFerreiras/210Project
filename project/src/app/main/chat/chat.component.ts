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
  friendArrayLite = {current: [], incoming: [], sent: []};
  friendList = [];
  tabSetting = "";

  constructor(private userService: UserService) { }

  ngOnInit(){
    this.tabSetting = "current";
    setInterval(__ => {this.updateFriends()}, 1000);
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
      this.updateFriends();
    }, (err) => {
      console.error(err);
    });
  }

  deleteFriend(toDelete: string){
    this.userService.deleteFriend({username: this.userService.getUserDetails().username, friendTOBeDeleted: toDelete}).subscribe(result => {
      this.updateFriends();
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
    this.updateFriendList(choice);
  }

  updateFriendList(setting: string){
    if(setting == "current"){
      this.friendList = this.friendArray.current;
    }else if(setting == "incoming"){
      this.friendList = this.friendArray.incoming;
    }else{
      this.friendList = this.friendArray.sent;
    }
  }

  updateFriends(){
    this.userService.getFriends().subscribe(result => {
      this.friendArray = result.collection;
      this.friendArrayLite = result.lite;
      this.updateFriendList(this.tabSetting);
    }, (err) => {
      console.error(err);
    });
  }

  friendStatusOf(username: string): string{
    console.log(this.friendArrayLite);
    if(this.friendArrayLite.current.includes(username)){
      return "current";
    }else if(this.friendArrayLite.incoming.includes(username)){
      return "incoming";
    }else if(this.friendArrayLite.sent.includes(username)){
      return "sent";
    }else{
      return "none";
    }
  }
}




  