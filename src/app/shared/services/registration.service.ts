import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Registration } from '../interfaces/Registration';
@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  registrationList = new BehaviorSubject<Registration[]>([
    {
      id: 1,
      student: {
        id: 1,
        firstName: 'Nuttakarn',
        lastName: 'Sattananan',
        email: 'nuttakarngg@gmail.com',
        phoneNumber: '0123456789',
        dateOfBirth: new Date(31, 5, 2543),
      },
      course: {
        id: 1,
        name: 'Computer Science',
        credit: 1.5,
        price: 1400,
      },
      status: true,
      registrationDate: new Date(6, 6, 2565),
    },
  ]);
  constructor() {}

  getAllRegistration() {
    return this.registrationList;
  }

  addRegistration(registration: any) {
    let registrations = this.registrationList.value;
    let payload = {
      id: registrations.length,
      ...registration,
    };
    this.registrationList.next([...registrations, payload]);
  }
}
