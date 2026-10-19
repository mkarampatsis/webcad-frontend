import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive  } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  authService = inject(AuthService);

  onLogout(){
    console.log("Logout")
    this.authService.logoutUser()
  }
}
