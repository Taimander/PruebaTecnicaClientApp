import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  get<T>(path: string) {
    return this.http.get<T>(path);
  }

  getProducts(): Observable<{products: Producto[]}> {
    return this.get<{products: Producto[]}>('/api/producto');
  }

  getProduct(id: number): Observable<Producto> {
    return this.get<Producto>(`/api/producto/${id}`);
  }

}
