import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Producto } from '../../../models/Producto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent implements OnInit{

  product?: Producto;

  isLoading = true;
  isError = false;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['id'];
    this.dataService.getProduct(productId).subscribe({
      next: (data: Producto) => {
        this.product = data;
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        console.log(error);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  back() {
    this._location.back();
  }

  confirmDelete() {
    if(this.product) {
      this.dataService.deleteProduct(this.product.id).subscribe({
        next: (data) => {
          this.router.navigate(['products']);
        },
        error: (error) => {
          alert("Ocurrió un error al eliminar el producto, intentalo de nuevo.");
        }
      });
    }
  }

}
