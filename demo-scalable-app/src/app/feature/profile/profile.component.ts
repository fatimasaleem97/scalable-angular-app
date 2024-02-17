import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userId: number | null = null;
  user: User;
  
  constructor(private _userservice: UserService, private _router: Router) { 
    this.user = new User();
  }

  ngOnInit(): void {
    this.userId = Number(window.localStorage.getItem('uid'));
    this.GetUserById();
  }

  public onEditProfile(){
    this._router.navigate(['profile/edit']);
  }

  public onViewFollowers () {
    this._router.navigate(['profile/followers']);
  }

  public GetUserById(){
    if (this.userId) {
      this._userservice.GetUserById().subscribe(
        (res: any) => {
          if (res['data']) {
            this.user.id = Number(res['data'].id);
            this.user.fullName = res['data'].fullName;
            this.user.email = res['data'].email;
            this.user.password = res['data'].password;
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
