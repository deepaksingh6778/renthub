
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  userName: string | null = null;
  userEmail: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('userEmail');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}
