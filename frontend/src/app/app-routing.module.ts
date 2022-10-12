import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '**', redirectTo: 'home'},
  //{ path: 'home', component: OrdersNewComponent },
];

export const routing = RouterModule.forRoot(routes);