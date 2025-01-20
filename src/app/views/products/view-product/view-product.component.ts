import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Producto } from '../../../models/Producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {

  product_id!: number;
  product!: Producto;

  isLoading = true;
  isError = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product_id = this.activatedRoute.snapshot.params['id'];
    if(!this.product_id) {
      this.isError = true;
      return;
    }
    this.loadProduct();
  }

  loadProduct() {
    this.isLoading = true;
    this.isError = false;
    this.dataService.getProduct(this.product_id).subscribe({
      next: (data: Producto) => {
        this.product = data;
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

  back() {
    this.router.navigate(['products']);
  }

}
