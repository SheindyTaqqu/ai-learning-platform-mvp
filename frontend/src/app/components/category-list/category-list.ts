import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Category } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  error = '';
  icons: Record<string, string> = {
    'מדע': '🔬',
    'היסטוריה': '🏛️',
    'טכנולוגיה': '💻',
    'מתמטיקה': '📊'
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => this.error = 'שגיאה בטעינת הקטגוריות'
    });
  }

  selectCategory(cat: Category) {
    this.router.navigate(['/subcategories', cat._id], { queryParams: { catName: cat.name } });
  }
}