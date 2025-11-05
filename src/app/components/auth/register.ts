import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  model = { name: '', email: '', password: '' };
  submitted = false;

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;
    // TODO: connect to API
    alert(`Registered: ${this.model.name} (${this.model.email})`);
  }
}
