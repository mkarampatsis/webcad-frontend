import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  newUser = signal<boolean>(false);
}
