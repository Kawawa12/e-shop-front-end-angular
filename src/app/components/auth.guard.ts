import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Get the user's role from localStorage
  const role = localStorage.getItem('role');

  // Extract the expected role from route data
  const expectedRole = route.data?.['role'];

  if (role === expectedRole) {
    return true; // Allow access
  } else if (role === 'USER') {
    router.navigate(['/place-order']); // Redirect USER to the place order page
  } else {
    router.navigate(['/home']); // Redirect others to the home page
  }

  return false; // Deny access if none of the conditions match
};
