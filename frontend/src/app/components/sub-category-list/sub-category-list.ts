import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, SubCategory } from '../../services/api';

@Component({
  selector: 'app-sub-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-category-list.html',
  styleUrl: './sub-category-list.css'
})
export class SubCategoryListComponent implements OnInit {
  subCategories: SubCategory[] = [];
  categoryId: string | null = null;
  categoryName: string | null = null;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.categoryName = this.route.snapshot.queryParamMap.get('catName');

    if (this.categoryId) {
      this.apiService.getSubCategories(this.categoryId).subscribe({
        next: (data) => this.subCategories = data,
        error: () => this.error = 'שגיאה בטעינת הנתונים'
      });
    }
  }

  selectSubCategory(sub: SubCategory) {
    this.router.navigate(
      ['/prompt', this.categoryId, sub._id],
      { queryParams: { catName: this.categoryName, subName: sub.name } }
    );
  }

  goToCategories() {
    this.router.navigate(['/']);
  }
}