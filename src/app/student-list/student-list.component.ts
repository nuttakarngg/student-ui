import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Course } from '../shared/interfaces/Course';
import { Registration } from '../shared/interfaces/Registration';
import { CourseService } from '../shared/services/course.service';
import { RegistrationService } from '../shared/services/registration.service';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  courseList$ = this.courseService.getAllCourse();
  filteredRegisterData: Registration[] = [];
  courseSelected?: Course;
  registerForm = this.formBuilder.group({
    firstName: this.formBuilder.control(null),
    lastName: this.formBuilder.control(null),
    email: this.formBuilder.control(null),
    course: this.formBuilder.control({ id: null, name: '' }),
    status: this.formBuilder.control(false),
  });
  constructor(
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}
  reset() {
    this.registerForm.reset();
    this.filteredRegisterData = [];
  }
  search() {
    this.registrationService.getAllRegistration().subscribe((registrations) => {
      const searchValue = this.registerForm.value;
      this.filteredRegisterData = registrations
        .filter(({ student }) => {
          if (searchValue.firstName) {
            return student.firstName.includes(searchValue.firstName);
          }
          return true;
        })
        .filter(({ student }) => {
          if (searchValue.lastName) {
            return student.lastName.includes(searchValue.lastName);
          }
          return true;
        })
        .filter(({ student }) => {
          if (searchValue.email) {
            return student.email.includes(searchValue.email);
          }
          return true;
        })
        .filter(({ course }) => {
          if (searchValue.course?.id) {
            return course.id === searchValue.course.id;
          }
          return true;
        })
        .filter(({ status }) => {
          if (status !== null) {
            return status === searchValue.status;
          }

          return true;
        });
    });
  }
  ngOnInit(): void {}
}
