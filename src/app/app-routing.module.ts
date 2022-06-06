import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormStudentComponent } from './form-student/form-student.component';
import { Mode } from './shared/types/mode';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'student' },
  {
    path: 'student',
    component: StudentListComponent,
  },
  {
    path: 'add-student',
    component: FormStudentComponent,
    data: {
      mode: Mode.ADD,
    },
  },
  {
    path: 'edit-student/:id',
    component: FormStudentComponent,
    data: {
      mode: Mode.Edit,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
