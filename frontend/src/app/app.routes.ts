import { Routes } from '@angular/router';
import { Add } from './add/add';
import { Home } from './home/home';
import { Login } from './security/login/login';
import { Register } from './security/register/register';
import { Default } from './default/default';
import { ProductPage } from './detail/product-page/product-page';

export const routes: Routes = [
    {path:"", component:Home}, 
    {path:"product/:id", component:ProductPage},
    {path:"add", component:Add},    
    {path:"login", component:Login}, 
    {path:"register", component:Register},
    {path:"**", component:Default}
];
