import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { NavbarComponent } from '../navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  model = { email: '', password: '' };
  submitted = false;

  constructor(private router: Router, private dbService: DbService) {}

  async onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;
    const user = await this.dbService.getUserByEmail(this.model.email);
    if (user && user.password === this.model.password) {
      localStorage.setItem('authToken', 'dummy-token');
      this.router.navigate(['/']);
    } else {
      alert('Invalid email or password');
    }
  }
}
