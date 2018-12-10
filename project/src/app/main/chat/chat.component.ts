import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}


  