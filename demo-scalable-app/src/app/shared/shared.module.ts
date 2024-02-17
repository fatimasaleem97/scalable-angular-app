import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomTableComponent } from './components/custom-table/custom-table.component';

@NgModule({
  declarations: [CustomTableComponent],
  imports: [
    CommonModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    CustomTableComponent
  ],
  providers: []
})
export class SharedModule { 
  constructor(){}
}
