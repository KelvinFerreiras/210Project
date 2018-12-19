import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) { }
  details: UserDetails;
  userResults: string;




  ngOnInit() {
    this.userService.userProfile().subscribe(user => {
      this.details = user.user;
    }, (err) => {
      console.error(err);
    });
  }
}
