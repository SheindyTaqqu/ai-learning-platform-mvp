import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Prompt } from '../../services/api';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prompt.html',
  styleUrl: './prompt.css'
})
export class PromptComponent implements OnInit {
  categoryName = '';
  subCategoryName = '';
  categoryId = '';
  subCategoryId = '';
  response = '';
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      this.router.navigate(['/register']);
      return;
    }

    const { _id: userId } = JSON.parse(user);
    this.categoryId = this.route.snapshot.paramMap.get('categoryId') || '';
    this.subCategoryId = this.route.snapshot.paramMap.get('subCategoryId') || '';
    this.categoryName = this.route.snapshot.queryParamMap.get('catName') || '';
    this.subCategoryName = this.route.snapshot.queryParamMap.get('subName') || '';

    if (!this.categoryId || !this.subCategoryId || !this.categoryName || !this.subCategoryName) {
      this.error = 'פרטים חסרים, חזור ובחר שוב';
      this.loading = false;
      return;
    }

    this.apiService.askAI({
      user_id: userId,
      category_id: this.categoryId,
      sub_category_id: this.subCategoryId,
      categoryName: this.categoryName,
      subCategoryName: this.subCategoryName
    }).subscribe({
      next: (data: Prompt) => {
        this.response = data.response;
        this.loading = false;
      },
      error: () => {
        this.error = 'שגיאה בקבלת התשובה';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/subcategories', this.categoryId], {
      queryParams: { catName: this.categoryName }
    });
  }
}
