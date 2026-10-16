import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from 'src/app/components/navbar/navbar';
import { Dashboard } from './components/dashboard/dashboard';
import { Footer } from "./components/footer/footer";
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);

  user = this.authService.user;
  
}
