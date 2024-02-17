import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrl: './followers-list.component.css'
})
export class FollowersListComponent {
  userId: number | null = null;
  users: Array<User> = [];

  constructor(private _userservice: UserService, private _router: Router) { 
  }

  ngOnInit(): void {
    this.userId = Number(window.localStorage.getItem('uid'));
    this.GetUsers();
  }

  public GetUsers(){
    if (this.userId) {
      this._userservice.getUsers().subscribe(
        (res: any) => {
          if (res['data']) {
            this.users = res['data']['users'];
          }
          else{
            console.log(res);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
