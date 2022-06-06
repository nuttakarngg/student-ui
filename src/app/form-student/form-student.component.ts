import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Registration } from '../shared/interfaces/Registration';
import { CourseService } from '../shared/services/course.service';
import { RegistrationService } from '../shared/services/registration.service';
import { StudentService } from '../shared/services/student.service';
import { Mode } from '../shared/types/mode';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss'],
})
export class FormStudentComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}
  studentList$ = this.studentService.getAllStudent();
  courseList$ = this.courseService.getAllCourse();
  registerForm = this.formBuilder.group({
    registrationDate: this.formBuilder.control(null, [Validators.required]),
    student: this.formBuilder.control(null, [Validators.required]),
    course: this.formBuilder.control(null, [Validators.required]),
    status: this.formBuilder.control(null, [Validators.required]),
  });
  mode: Mode = Mode.ADD;
  ngOnInit(): void {
    const { mode } = this.activeRoute.snapshot.data;
    this.mode = mode;
  }
  goBack() {
    this.location.back();
  }

  save() {
    if (this.registerForm.valid) {
      if (this.mode === Mode.ADD) {
        this.registrationService.addRegistration(this.registerForm.value);
        this.messageService.add({
          severity: 'success',
          data: 'Success',
          detail: 'บันทึกสำเร็จ',
        });
      } else if (this.mode === Mode.Edit) {
      }
    }
  }
}
