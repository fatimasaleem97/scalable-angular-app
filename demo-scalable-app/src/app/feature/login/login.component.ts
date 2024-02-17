import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = new User();
  submit: boolean = false;

  constructor(private _userservice: UserService, private _router: Router) {}

  public Login(){
    this.submit = true;
    if (this.user.email && this.user.password) {
      this._userservice.Login(this.user).subscribe(
        (res: any) => {
          if (res['success'] && res['user']) {
            this.submit = false;
            window.localStorage.setItem('token', res['tokenValues'].accessToken);
            window.localStorage.setItem('rtoken', res['tokenValues'].refreshToken);
            window.localStorage.setItem('uid', res['user'].id);
            window.localStorage.setItem('uname', res['user'].fullName);
            window.localStorage.setItem('uemail', res['user'].email);
            window.localStorage.setItem('upassword', res['user'].password);
            this._router.navigate(['/profile']);
          }
          else{
            this.submit = false;
            this.user = new User();
          }
        },
        err => {
          console.log(err);
          this.submit = false;
          this.user = new User();
        }
      )
    }
  }
}
