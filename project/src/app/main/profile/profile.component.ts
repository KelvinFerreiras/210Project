import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  userDetails = this.userService.getUserDetails();
  exp = new Date(0);
  __ = this.exp.setUTCSeconds(this.userDetails.exp);
  
  ngOnInit() {
  }

}
