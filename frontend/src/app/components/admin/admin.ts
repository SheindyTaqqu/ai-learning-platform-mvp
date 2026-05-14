import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, UserWithPrompts } from '../../services/api';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  users: UserWithPrompts[] = [];
  loading = true;
  expandedUserId: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.apiService.getAllUsersWithPrompts().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  toggleUser(userId: string) {
    this.expandedUserId = this.expandedUserId === userId ? null : userId;
  }
}
