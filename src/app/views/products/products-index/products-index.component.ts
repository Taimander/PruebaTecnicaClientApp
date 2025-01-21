import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Producto } from '../../../models/Producto';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-products-index',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
],
  templateUrl: './products-index.component.html',
  styleUrl: './products-index.component.css'
})
export class ProductsIndexComponent implements OnInit {

  product_list: Producto[] = [];

  isLoading = true;
  isError = false;

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.isError = false;
    this.dataService.getProducts().subscribe({
      next: (data: {products: Producto[]}) => {
        this.product_list = data.products;
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true
      }
    });
  }

  goToProduct(id: number) {
    this.router.navigate(['products', id]);
  }

  goToEdit(id: number) {
    this.router.navigate(['products/edit', id]);
  }

  goToDelete(id: number) {
    this.router.navigate(['products/delete', id]);
  }

}
