import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FollowersListComponent } from './followers-list/followers-list.component';

const routes: Routes = [ 
  { path: '', component: ProfileComponent },
  { path:'edit', component:EditProfileComponent },
  { path:'followers', component:FollowersListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
