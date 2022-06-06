import { Course } from './Course';
import { Student } from './Student';

export interface Registration {
  id?: number;
  registrationDate: Date;
  student: Student;
  course: Course;
  status:boolean
}
