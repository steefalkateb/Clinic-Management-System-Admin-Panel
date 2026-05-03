import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDoctorPage } from './edit-doctor';

@NgModule({
  declarations: [
    EditDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDoctorPage),
  ],
})
export class EditDoctorPageModule {}
