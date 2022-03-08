import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { CategoryDoneGuard } from './auth/category-done.guard';

const routes: Routes = [
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule'/*, canActivate:[LoginGuard]*/ },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' /* , canActivate:[AuthGuard] */ },
  { path: '', redirectTo: 'tabs', pathMatch: 'full', canActivate: [] },
  { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesPageModule'/*, canActivate:[CategoryDoneGuard]  */ },
  { path: 'add-post', loadChildren: './pages/add-post/add-post.module#AddPostPageModule' },
  { path: 'user-profile', loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
