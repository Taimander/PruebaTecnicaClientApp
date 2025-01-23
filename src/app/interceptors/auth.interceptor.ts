import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function AuthInterceptor (req: HttpRequest<any>, next: HttpHandlerFn) {
  let finalReq = req;
  const token = localStorage.getItem('token');
  if (token) {
    finalReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
  return next(finalReq);
};