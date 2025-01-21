import { Routes } from '@angular/router';
import { ProductsIndexComponent } from './views/products/products-index/products-index.component';
import { ViewProductComponent } from './views/products/view-product/view-product.component';
import { LoginComponent } from './views/login/login.component';
import { NavlayoutComponent } from './layout/navlayout/navlayout.component';
import { CreateEditProductComponent } from './views/products/create-edit-product/create-edit-product.component';
import { DeleteProductComponent } from './views/products/delete-product/delete-product.component';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: '', component: NavlayoutComponent, children: [
        {path: 'products', component: ProductsIndexComponent},
        {path: 'products/create', component: CreateEditProductComponent},
        {path: 'products/edit/:id', component: CreateEditProductComponent},
        {path: 'products/delete/:id', component: DeleteProductComponent},
        {path: 'products/:id', component: ViewProductComponent},
    ]},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'products'}
];
