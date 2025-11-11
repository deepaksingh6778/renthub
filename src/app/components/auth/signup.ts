import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class Signup {
  login = { email: '', password: '' };
  register = { name: '', email: '', password: '' };

  onLoginSubmit() {
    if (!this.login.email || !this.login.password) {
      alert('Please enter email and password');
      return;
    }
    // Placeholder action
    alert(`Logged in as ${this.login.email}`);
  }

  onRegisterSubmit() {
    if (!this.register.name || !this.register.email || !this.register.password) {
      alert('Please complete all registration fields');
      return;
    }
    // Placeholder action
    alert(`Registered ${this.register.name} (${this.register.email})`);
  }
}
