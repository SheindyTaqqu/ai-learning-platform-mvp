import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  loading = false;
  expandedUserId: string | null = null;
  isAuthenticated = false;
  password = '';
  authError = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  login(): void {
    if (!this.password) {
      this.authError = 'נא להכניס סיסמה';
      return;
    }
    this.authError = '';
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.apiService.getAllUsersWithPrompts(this.password).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
        this.isAuthenticated = true;
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.authError = 'סיסמה שגויה';
        }
      }
    });
  }

  toggleUser(userId: string) {
    this.expandedUserId = this.expandedUserId === userId ? null : userId;
  }
}
