import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function AuthInterceptor (req: HttpRequest<any>, next: HttpHandlerFn) {
  let finalReq = req;
  const token = localStorage.getItem('token');
  // If there is a token, add it to the headers
  if (token) {
    finalReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
  return next(finalReq);
};