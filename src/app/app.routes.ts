import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { authGuard } from './components/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' },  
    children: [
      { path: 'dashboard', component: AdminComponent },  
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: 'add-category', component: AddCategoryComponent, 
    canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: 'place-order', component: PlaceOrderComponent, 
    canActivate: [authGuard], data: { role: 'USER' } },
  { path: 'products', component: AddProductComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
