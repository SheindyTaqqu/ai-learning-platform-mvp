import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  _id: string;
  name: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  category_id: string;
}

export interface User {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string;
}

export interface Prompt {
  _id: string;
  user_id: string;
  category_id: Category;
  sub_category_id: SubCategory;
  prompt: string;
  response: string;
  createdAt: string;
}

export interface UserWithPrompts extends User {
  prompts: Prompt[];
}

export interface AskAIRequest {
  user_id: string;
  category_id: string;
  sub_category_id: string;
  categoryName: string;
  subCategoryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getSubCategories(categoryId: string): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.baseUrl}/subcategories/${categoryId}`);
  }

  askAI(data: AskAIRequest): Observable<Prompt> {
    return this.http.post<Prompt>(`${this.baseUrl}/prompts/ask`, data);
  }

  createUser(data: { name: string; phone: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, data);
  }

  getUserHistory(userId: string): Observable<Prompt[]> {
    return this.http.get<Prompt[]>(`${this.baseUrl}/prompts/user/${userId}`);
  }

  getAllUsersWithPrompts(): Observable<UserWithPrompts[]> {
    return this.http.get<UserWithPrompts[]>(`${this.baseUrl}/users/admin`);
  }
}
