import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/auth/login';
import { Register } from './components/auth/register';
import { CreatePost } from './components/posts/create-post';
import { PreviewPost } from './components/posts/preview-post';
import { AuthGuard } from './components/auth/auth.guard';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
    { path: '', component: Home, canActivate: [AuthGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'profile', component: Profile, canActivate: [AuthGuard] },
    { path: 'posts/create', component: CreatePost, canActivate: [AuthGuard] },
    { path: 'posts/preview/:id', component: PreviewPost, canActivate: [AuthGuard] }
];
