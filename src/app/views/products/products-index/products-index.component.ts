import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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
export class ProductsIndexComponent {

  products: any[] = [
    {name: "Product 1", price: 100, description: "This is a product", category: "Category 1"},
    {name: "Product 2", price: 200, description: "This is a product", category: "Category 2"},
    {name: "Product 3", price: 300, description: "This is a product", category: "Category 3"},
    {name: "Product 4", price: 400, description: "This is a product", category: "Category 4"},
  ];

}
