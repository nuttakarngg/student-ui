import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../interfaces/Student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentList = new BehaviorSubject<Student[]>([
    {
      id: 1,
      firstName: 'Nuttakarn',
      lastName: 'Sattananan',
      dateOfBirth: new Date(31, 5, 2543),
      email: 'nuttakarngg@gmail.com',
      phoneNumber: '102039495',
    },
    {
      id: 2,
      firstName: 'Wissarut',
      lastName: 'Kongjumnian',
      dateOfBirth: new Date(20, 1, 2542),
      email: 'nongmixnaja@gmail.com',
      phoneNumber: '102039495',
    },
    {
      id: 3,
      firstName: 'Chaiyapol',
      lastName: 'Mahajun',
      dateOfBirth: new Date(26, 4, 2543),
      email: 'titla_blackstar@gmail.com',
      phoneNumber: '102039495',
    },
  ]);
  constructor() {}

  getAllStudent() {
    return this.studentList;
  }

}
