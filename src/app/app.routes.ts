import { Routes } from '@angular/router';
import { ProductsIndexComponent } from './views/products/products-index/products-index.component';
import { ViewProductComponent } from './views/products/view-product/view-product.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', component: ProductsIndexComponent},
    {path: 'products/:id', component: ViewProductComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'products'}
];
