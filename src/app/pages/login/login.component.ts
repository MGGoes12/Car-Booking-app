import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mode: 'signin' | 'signup' = 'signin';
  email = '';
  password = '';
  message = '';
  error = '';
  resetEmail = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    this.supabase.authUser$.subscribe(user => {
      if (user) {
        this.router.navigate(['/overview']);
      }
    });
  }

  async submit() {
    this.error = '';
    this.message = '';
    if (!this.email || !this.password) {
      this.error = 'Email and password are required.';
      return;
    }
    if (this.mode === 'signin') {
      const { error } = await this.supabase.signIn(this.email, this.password);
      if (error) {
        this.error = error.message;
      }
    } else {
      const { error } = await this.supabase.signUp(this.email, this.password);
      if (error) {
        this.error = error.message;
      } else {
        this.message = 'Sign-up sent. Please check email to verify and then sign in.';
      }
    }
  }

  async resetPassword() {
    this.error = '';
    this.message = '';
    if (!this.resetEmail) {
      this.error = 'Enter the email address to reset password.';
      return;
    }
    const { error } = await this.supabase.resetPassword(this.resetEmail);
    if (error) {
      this.error = error.message;
    } else {
      this.message = 'Password reset email sent. Follow the link to set a new password.';
    }
  }
}
