import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';
import { Observable } from 'rxjs';
import { CreateProductoDto } from '../models/CreateProducto.dto';

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

  createProduct(product: CreateProductoDto): Observable<any> {
    return this.http.post<any>('/api/producto', product);
  }

  updateProduct(id: number, product: CreateProductoDto): Observable<any> {
    return this.http.patch<any>(`/api/producto?id=${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`/api/producto?id=${id}`);
  }

}
