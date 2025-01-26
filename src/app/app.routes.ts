import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { authGuard } from './components/auth.guard'; // Adjusted guard naming
import { LayoutComponent } from './components/layout/layout.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { OrderComponent } from './components/order/order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authGuard], // Updated guard naming
    data: { role: 'ADMIN' },
    children: [
      { path: 'dashboard', component: AdminComponent },
      { path: 'category', component: AddCategoryComponent },
      { path: 'product', component: AddProductComponent },
      { path: 'order', component: OrderComponent },
      { path: 'coupon', component: CouponComponent },
      { path: 'analysis', component: AnalyticsComponent },
      { path: 'comment', component: CommentsComponent },
      { path: 'profile', component: ProfileComponent },

    ],
  },
  { 
    path: 'place-order', 
    component: PlaceOrderComponent, 
    canActivate: [authGuard], 
    data: { role: 'USER' } 
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: '**', redirectTo: 'home', pathMatch: 'full' },  
];
