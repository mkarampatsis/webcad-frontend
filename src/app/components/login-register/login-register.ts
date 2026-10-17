import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginService } from 'src/app/shared/services/login.service';

declare let google: any;

@Component({
  selector: 'app-login-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-register.html',
  styleUrl: './login-register.css',
})
export class LoginRegister {
  authService = inject(AuthService);
  userService = inject(UserService);
  loginService = inject(LoginService)
  user = this.authService.user;

  newUser = this.loginService.newUser;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    this.passwordMatchValidator,
  );

  async ngOnInit() {
    this.googleInitialize();
  }

  googleInitialize() {
    console.log('Google Sign-In button initialization started.');
    this.authService
      .initializeGoogleSignIn()
      .then((google) => {
        const googleButton = document.getElementById('googleBtn');
        if (googleButton) {
          google.accounts.id.renderButton(googleButton, {
            theme: 'outline',
            size: 'large',
            shape: 'rectangular',
            logo_alignment: 'center',
            width: '50%',
          });
        }
      })
      .catch((error) => {
        console.error('Error initializing Google Sign-In:', error);
      });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const form = control as FormGroup;
    const password = form?.get('password')?.value;
    const confirmPassword = form?.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      form?.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      form?.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  signUp() {
    this.newUser.set(true);
  }

  loginWithEmail(value: Partial<{ email: string | null; password: string | null }>) {
    console.log('Login form submitted with values:', value);
    this.authService
      .loginUser({
        email: value.email || '',
        password: value.password || '',
      })
      .subscribe({
        next: (res) => {
          // console.log('Login successful', res);
          const decodedToken = jwtDecode(res.token);
          this.authService.user.set(decodedToken as any);
          localStorage.setItem('accessToken', res.token);
          this.authService.router.navigate(['/than-cad']);
        },
        error: (err) => console.error('Login error', err),
      });
  }

  signUpFormSubmit(
    value: Partial<{
      email: string | null;
      firstname: string | null;
      lastname: string | null;
      password: string | null;
      confirmPassword: string | null;
    }>,
  ) {
    console.log('Sign-up form submitted with values:', value);
    this.userService
      .registerUser({
        email: value.email || undefined,
        name: `${value.firstname} ${value.lastname}`,
        password: value.password || undefined,
      })
      .subscribe({
        next: (res) => {
          // console.log('User registered successfully', res);
          this.signUpForm.reset();
          this.newUser.set(false);
        },
        error: (err) => console.error('User registration error', err),
      });
  }

  resetsignUpForm() {
    this.signUpForm.reset();
    this.newUser.set(false);
  }

  switchView(viewType: 'login' | 'signup') {
    this.newUser.set(viewType === 'signup');
    console.log(`Switched to ${viewType} view. newUser is now:`, this.newUser);
    if (viewType === 'login') {
      this.signUpForm.reset();
      this.googleInitialize();
    }
  }

  // toggleView() {
  //   this.newUser = !this.newUser;
  // }
}
