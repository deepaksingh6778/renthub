import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;
    // Set dummy auth token
    localStorage.setItem('authToken', 'dummy-token');
    // Redirect to home
    this.router.navigate(['/']);
  }
}
