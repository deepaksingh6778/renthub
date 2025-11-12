import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  model = { name: '', email: '', password: '' };
  submitted = false;

  constructor(private dbService: DbService, private router: Router) {}

  async onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;
    await this.dbService.registerUser(this.model);
    this.router.navigate(['/login']);
  }
}
