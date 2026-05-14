import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private router: Router) {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/register']);
    }
  }

  get currentUser(): any {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/register']);
  }
}
