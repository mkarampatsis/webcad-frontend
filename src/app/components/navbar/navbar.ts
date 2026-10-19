import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authService = inject(AuthService);
  loginService = inject(LoginService);

  user = this.authService.user;

  loginPage(type: string){
    this.loginService.newUser.set(type==='signup')
  }
}
