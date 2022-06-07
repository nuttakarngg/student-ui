import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Course } from '../shared/interfaces/Course';
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
    id: this.formBuilder.control(null),
    registrationDate: this.formBuilder.control(null, [Validators.required]),
    student: this.formBuilder.control(null, [Validators.required]),
    course: this.formBuilder.control(null, [Validators.required]),
    status: this.formBuilder.control({ value: false, disabled: false }, [
      Validators.required,
    ]),
    price: this.formBuilder.control({ value: 0, disabled: true }, [
      Validators.required,
    ]),
  });
  mode: Mode = Mode.ADD;
  ngOnInit(): void {
    const { mode } = this.activeRoute.snapshot.data;
    const { id } = this.activeRoute.snapshot.params;
    this.mode = mode;
    if (mode === Mode.Edit) {
      const value = this.registrationService.getRegistrationById(id) as any;

      this.registerForm.patchValue({
        ...value,
        price: value.course.credit * value.course.price,
      });
    }
  }
  goBack() {
    this.location.back();
  }

  save() {
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      if (this.mode === Mode.ADD) {
        this.registerForm.patchValue(
          this.registrationService.addRegistration(this.registerForm.value)
        );
        this.messageService.add({
          severity: 'success',
          data: 'Success',
          detail: 'บันทึกสำเร็จ',
        });
        this.mode = Mode.Edit;
      } else if (this.mode === Mode.Edit) {
        this.registrationService.updateRegistration(this.registerForm.value);
        this.messageService.add({
          severity: 'success',
          data: 'Success',
          detail: 'แก้ไขสำเร็จ',
        });
      }
    }
  }
  setCredit($event: any) {
    const { price, credit } = $event.value as Course;
    const totalPrice = credit * price;
    this.registerForm.get('price')?.setValue(totalPrice);
  }
}
