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

    //Async test
    setTimeout( __ => {
      this.details.fullName = this.details.fullName + "_3";
    }, 3000);

    this.userService.queryUsers("b", 3).subscribe(result => {
      console.log(result.users)
    }, (err) => {
      console.error(err);
    });
  }
}
