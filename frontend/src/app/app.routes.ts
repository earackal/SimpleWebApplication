import { Routes } from '@angular/router';
import { Add } from './add/add';
import { Home } from './home/home';

export const routes: Routes = [
    {path:"add", component:Add},
    {path:"", component:Home}
];
