import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  tab: 'register' | 'login' = 'register';
  name = '';
  phone = '';
  error = '';

  constructor(private apiService: ApiService, private router: Router) {}

  switchTab(t: 'register' | 'login') {
    this.tab = t;
    this.error = '';
    this.name = '';
    this.phone = '';
  }

  register() {
    if (!this.name || !this.phone) {
      this.error = 'נא למלא שם וטלפון';
      return;
    }
    this.apiService.createUser({ name: this.name, phone: this.phone }).subscribe({
      next: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.message || 'שגיאה בהרשמה';
      }
    });
  }

  login() {
    if (!this.name || !this.phone) {
      this.error = 'נא למלא שם וטלפון';
      return;
    }
    this.apiService.loginUser({ name: this.name, phone: this.phone }).subscribe({
      next: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.message || 'שגיאה בכניסה';
      }
    });
  }
}
