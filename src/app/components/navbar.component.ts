import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header style="width: 100%; border-bottom: 1px solid #eee; background: #fff;">
      <div style="max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 16px 32px;">
  <a routerLink="/" style="font-size: 2rem; font-weight: 700; color: #222; letter-spacing: 1px; text-decoration: none;">RentHub</a>
        <nav>
          <ul style="display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; font-size: 1.1rem; font-weight: 500;">
            <li><a routerLink="/posts/create" style="color: #555; text-decoration: none;">Create Post</a></li>
            <li><a routerLink="/login" style="color: #555; text-decoration: none;">Login</a></li>
            <li><a routerLink="/register" style="color: #555; text-decoration: none;">Register</a></li>
            <li><a routerLink="/profile" style="color: #555; text-decoration: none;">Profile</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `
})
export class NavbarComponent {}
