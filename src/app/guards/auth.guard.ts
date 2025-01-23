import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { jwtDecode } from "jwt-decode";

// Guard function to check if the user is authenticated
// If the user is not authenticated, redirect to the login page
export const authGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    if (isTokenValid()) {
      return true;
    }
  
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  };
  
// Guard function to check if the user is not authenticated
// If the user is authenticated, redirect to the home page
export const loginGuardFn: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (isTokenValid()) {
    const router = inject(Router);
    router.navigate(['/']);
    return false;
  }

  return true;
};

function isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      // Check if the token is expired with the exp property
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decodedToken.exp && decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Invalid token', error);
      return false;
    }
}