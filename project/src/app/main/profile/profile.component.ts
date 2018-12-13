import { Component, OnInit } from '@angular/core';
import { UserService} from '../../shared/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) { }
  details: User

  ngOnInit() {
    this.userService.userProfile().subscribe(user => {
      this.details = user.user;
    }, (err) => {
      console.error(err);
    });
  }

}
