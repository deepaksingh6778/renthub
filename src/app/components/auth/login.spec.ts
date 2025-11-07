import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DbService } from '../../services/db.service';
import { Login } from './login';

class MockDbService {
  getUserByEmail(email: string) {
    if (email === 'test@example.com') {
      return Promise.resolve({name: 'Test User', email, password: 'password123' });
    }
    return Promise.resolve(null);
  }
}

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let dbService: DbService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, Login, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: DbService, useClass: MockDbService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    dbService = TestBed.inject(DbService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with correct credentials and set sessionStorage', async () => {
    spyOn(sessionStorage, 'setItem');
    spyOn(router, 'navigate');
    component.model.email = 'test@example.com';
    component.model.password = 'password123';
    const form = { invalid: false } as any;
    await component.onSubmit(form);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('authToken', 'dummy-token');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('userName', 'Test User');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should alert on invalid credentials', async () => {
    spyOn(window, 'alert');
    component.model.email = 'wrong@example.com';
    component.model.password = 'wrongpass';
    const form = { invalid: false } as any;
    await component.onSubmit(form);
    expect(window.alert).toHaveBeenCalledWith('Invalid email or password');
  });
});
