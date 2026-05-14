import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list';
import { SubCategoryListComponent } from './components/sub-category-list/sub-category-list';
import { RegisterComponent } from './components/register/register';
import { PromptComponent } from './components/prompt/prompt';
import { HistoryComponent } from './components/history/history';
import { AdminComponent } from './components/admin/admin';

export const routes: Routes = [
    { path: '', component: CategoryListComponent },
    { path: 'subcategories/:categoryId', component: SubCategoryListComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'prompt/:categoryId/:subCategoryId', component: PromptComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'admin', component: AdminComponent }
];
