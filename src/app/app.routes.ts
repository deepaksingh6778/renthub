import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/auth/login';
import { Register } from './components/auth/register';
import { CreatePost } from './components/posts/create-post';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'posts/create', component: CreatePost }
];
