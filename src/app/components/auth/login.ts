import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  model = { email: '', password: '' };
  submitted = false;

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;
    // TODO: replace with real auth
    alert(`Logged in: ${this.model.email}`);
  }
}
