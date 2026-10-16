import { Component, inject } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authService = inject(AuthService)

  user = this.authService.user
}
