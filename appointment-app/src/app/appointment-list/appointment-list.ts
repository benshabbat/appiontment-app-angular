import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-list',
  imports: [FormsModule],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css'
})
export class AppointmentList {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      const newAppointment: Appointment = {
        id: this.appointments.length + 1,
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      };
      this.appointments.push(newAppointment);
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  removeAppointment(id: number) {
    this.appointments = this.appointments.filter(appointment => appointment.id !== id);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  ngOnInit() {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      this.appointments = JSON.parse(storedAppointments);
    }
  }
}
