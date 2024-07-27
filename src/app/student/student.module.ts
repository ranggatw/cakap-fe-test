import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStudentComponent } from './form-student/form-student.component';
import { PageStudentComponent } from './page-student/page-student.component';
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    FormStudentComponent,
    PageStudentComponent
  ],
  exports: [
    PageStudentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
