import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBindingPage } from './add-binding';

@NgModule({
  declarations: [
    AddBindingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBindingPage),
  ],
})
export class AddBindingPageModule {}
