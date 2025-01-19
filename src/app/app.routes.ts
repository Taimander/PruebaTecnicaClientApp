import { Routes } from '@angular/router';
import { ProductsIndexComponent } from './views/products/products-index/products-index.component';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', component: ProductsIndexComponent}
];
