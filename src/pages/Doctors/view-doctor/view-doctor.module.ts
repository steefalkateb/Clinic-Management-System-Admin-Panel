import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewDoctorPage } from './view-doctor';

@NgModule({
  declarations: [
    ViewDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewDoctorPage),
  ],
})
export class ViewDoctorPageModule {}
