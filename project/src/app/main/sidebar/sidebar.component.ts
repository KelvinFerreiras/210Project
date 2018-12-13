import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userService : UserService) { }

  logout(){
    this.userService.logout();
  }

  ngOnInit() {
  }

}
