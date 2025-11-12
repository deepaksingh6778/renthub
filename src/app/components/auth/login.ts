import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit {
  model = { email: '', password: '' };
  submitted = false;

  constructor(private router: Router, private dbService: DbService) {}

  ngOnInit() {
    // Check if user is already logged in
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      sessionStorage.removeItem('authToken');
    }
    const userName = sessionStorage.getItem('userName');
    if (userName) {
      sessionStorage.removeItem('userName');
    }
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      sessionStorage.removeItem('userEmail');
    }
  }

  async onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;
    const user = await this.dbService.getUserByEmail(this.model.email);
    if (user && user.password === this.model.password) {
      sessionStorage.setItem('authToken', 'dummy-token');
      sessionStorage.setItem('userName', user.name);
      sessionStorage.setItem('userEmail', user.email);
      this.router.navigate(['/']);
    } else {
      alert('Invalid email or password');
    }
  }
}
