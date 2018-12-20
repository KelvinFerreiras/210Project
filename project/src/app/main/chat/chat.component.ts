import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userQuery = []; 
  friendArray = {current: [], incoming: [], sent: []};
  friendArrayLite = {current: [], incoming: [], sent: []};
  friendList = [];
  tabSetting = "";
  messages = [];
  socket = io(`http://localhost:3001/?name=${this.userService.getUserDetails().fullName}`);

  constructor(private userService: UserService) { }

  ngOnInit(){
    this.tabSetting = "current";
    setInterval(__ => {this.updateFriends()}, 1000);

    //Chatroom 
    if(JSON.parse(sessionStorage.getItem('logs')) != null){
      this.messages = JSON.parse(sessionStorage.getItem('logs'));
    }

    this.socket.on('response', (response) =>{
      this.messages.push(response);
      sessionStorage.setItem('logs', JSON.stringify(this.messages));
    });
  }
  
  search(value: string){ 
    if(value != ""){
      this.userService.queryUsers(value, 10).subscribe(result => {
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
      if(!(result.collection === undefined || result.lite === undefined)){
        this.friendArray = result.collection;
        this.friendArrayLite = result.lite;
        this.updateFriendList(this.tabSetting);
      }
    }, (err) => {
      console.error(err);
    });
  }

  friendStatusOf(username: string): string{
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

  sendMsg(value){
    let body = {fullName: this.userService.getUserDetails().fullName, message: value};
    this.socket.emit('message', body);
  }
  
}




  