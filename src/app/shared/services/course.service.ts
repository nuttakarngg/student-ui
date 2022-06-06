import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../interfaces/Course';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courseList? = new BehaviorSubject<Course[]>([
    { id: 1, name: 'Computer Science', credit: 1.5, price: 1400 },
    { id: 2, name: 'Computer Engineer', credit: 2, price: 2000 },
    { id: 3, name: 'Computer Technology', credit: 2.5, price: 3000 },
  ]);
  constructor() {}

  getAllCourse() {
    return this.courseList;
  }
}
