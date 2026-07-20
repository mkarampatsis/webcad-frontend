import { Routes } from '@angular/router';

import { Landing } from 'src/app/components/landing/landing';
import { LoginRegister } from 'src/app/components/login-register/login-register';
import { About } from 'src/app/components/about/about';
import { Contact } from 'src/app/components/contact/contact';
import { CadWorkspace } from 'src/app/components/cad-workspace/cad-workspace';  
import { ThanCad } from 'src/app/components/than-cad/than-cad';
import { SkycivRenderer } from 'src/app/components/skyciv-renderer/skyciv-renderer';

import { authGuard } from './shared/guards/auth-guard';
import { adminRoleGuard } from './shared/guards/user-role-guard';

export const routes: Routes = [
  { path: '', component: Landing,     canActivate: [authGuard, adminRoleGuard],
 },
  { path: 'home', component: Landing },
  { path: 'login', component: LoginRegister },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'cad-workspace', component: CadWorkspace },
  { path: 'than-cad', component: ThanCad },
  { path: 'skyciv-renderer', component: SkycivRenderer },
];
