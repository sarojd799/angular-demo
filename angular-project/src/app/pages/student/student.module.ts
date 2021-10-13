import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';





@NgModule({
  declarations: [
    CreateStudentComponent,
    StudentListComponent
  ],
  imports: [
    SharedModule,
    StudentRoutingModule,

  ],
  exports: [
    StudentRoutingModule
  ]
})
export class StudentModule { }
