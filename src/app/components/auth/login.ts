import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { NavbarComponent } from '../navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit {
  model = { email: '', password: '' };
  submitted = false;

  constructor(private router: Router, private dbService: DbService) {}

  ngOnInit() {
    // Check if user is already logged in
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      localStorage.removeItem('authToken');
    }
  }

  async onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;
    const user = await this.dbService.getUserByEmail(this.model.email);
    if (user && user.password === this.model.password) {
      localStorage.setItem('authToken', 'dummy-token');
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', user.email);
      this.router.navigate(['/']);
    } else {
      alert('Invalid email or password');
    }
  }
}
