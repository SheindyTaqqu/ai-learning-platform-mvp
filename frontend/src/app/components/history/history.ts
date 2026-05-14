import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Prompt } from '../../services/api';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class HistoryComponent implements OnInit {
  history: Prompt[] = [];
  loading = true;
  userName = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('currentUser');
    if (!stored) {
      this.router.navigate(['/register']);
      return;
    }

    const user = JSON.parse(stored);
    this.userName = user.name;

    this.apiService.getUserHistory(user._id).subscribe({
      next: (data) => {
        this.history = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
