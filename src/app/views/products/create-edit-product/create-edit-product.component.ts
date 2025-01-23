import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Producto } from '../../../models/Producto';

@Component({
  selector: 'app-create-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-edit-product.component.html',
  styleUrl: './create-edit-product.component.css'
})
export class CreateEditProductComponent implements OnInit {

  isEditing: boolean = false;
  productId: number = 0; // Only used when editing

  form!: FormGroup;

  isLoading: boolean = true;
  isError: boolean = false;

  saving: boolean = false;
  saveError: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    // If its the url for editing a product, load the product
    if(this.activatedRoute.snapshot.url[1].path === 'edit') {
      this.isEditing = true;
      this.productId = this.activatedRoute.snapshot.params['id'];
      if(!this.productId) {
        this.isError = true;
        return;
      }
      this.loadProduct();
    }else {
      // Else, create a new product
      this.createForm('', 0, '', '');
      this.isLoading = false;
      this.isError = false;
    }
    
  }

  loadProduct() {
      this.isLoading = true;
      this.isError = false;
      this.dataService.getProduct(this.productId).subscribe({
        next: (data: Producto) => {
          this.createForm(data.nombre, data.precio, data.descripcion, data.categoria);
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

  createForm(nombre: string, precio: number, descripcion: string, categoria: string) {
    this.form = this.fb.group({
      nombre: new FormControl(nombre, [Validators.required]),
      precio: new FormControl(precio, [Validators.required, Validators.min(0)]),
      descripcion: new FormControl(descripcion, [Validators.required]),
      categoria: new FormControl(categoria, [Validators.required]),
    });
  }

  isInvalid(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

  submit() {
    // Mark all fields as touched to show errors
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.saveError = false;
    this.saving = true;
    if(this.isEditing) {
      this.updateProduct();
    }else {
      this.createProduct();
    }
  }

  createProduct() {
    this.dataService.createProduct(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['products']);
      },
      error: (error) => {
        console.log(error);
        this.saving = false;
        this.saveError = true;
      }
    });
  }

  updateProduct() {
    this.dataService.updateProduct(this.productId, this.form.value).subscribe({
      next: () => {
        this.router.navigate(['products', this.productId]);
      },
      error: (error) => {
        console.log(error);
        this.saving = false;
        this.saveError = true;
      }
    });
  }

  back() {
    this._location.back();
  }

}
