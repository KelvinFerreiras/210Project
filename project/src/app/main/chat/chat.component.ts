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
  
  onEnter(value: string){ 
    this.array2 = [];

    if(value != ""){
      this.userService.queryUsers(value, 100).subscribe(result => {
        for (var i of result.users) {
          this.array2.push(i.fullName);
        }
      }, (err) => {
        console.error(err);
      });
    }
  }

}


  