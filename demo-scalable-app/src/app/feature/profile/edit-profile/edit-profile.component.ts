import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  userId: number | null = null;
  user: User;  
  submit: boolean = false;

  constructor(private _userservice: UserService, private _router: Router) { 
    this.user = new User();
  }

  ngOnInit(): void {
    this.userId = Number(window.localStorage.getItem('uid'));
    this.GetUserById();
  }

  public UpdateUser(){
    this.submit = true;
    if (this.user.email && this.user.password && this.user.fullName) {      
      this.submit = false;
      this._router.navigate(['/profile']);    
    }
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
