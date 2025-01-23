import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { jwtDecode } from "jwt-decode";

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
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decodedToken.exp && decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Invalid token', error);
      return false;
    }
}