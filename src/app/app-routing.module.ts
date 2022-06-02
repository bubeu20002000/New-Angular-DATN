import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageCartComponent } from './page-cart/page-cart.component';
import { PageCheckoutComponent } from './page-checkout/page-checkout.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { UserComponent } from './user/user.component';
import { PageOrderComponent } from './page-order/page-order.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageSignupComponent } from './page-signup/page-signup.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserAddressEditComponent } from './user-address-edit/user-address-edit.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { MainComponent } from './_admin/main/main.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageOrderSuccessComponent } from './page-order-success/page-order-success.component';
import { DashboardComponent } from './_admin/dashboard/dashboard.component';
import { UsersComponent } from './_admin/users/users.component';
import { ProductsComponent } from './_admin/products/products.component';
import { OrdersComponent } from './_admin/orders/orders.component';

const routes: Routes = [
  { path:"", component:PageHomeComponent},
  { path:"cart", component:PageCartComponent},
  { path:"check-out", component:PageCheckoutComponent},
  { path:"order-success", component:PageOrderSuccessComponent },
  { path:"orders", component:PageOrderComponent },
  { path:"product-all", component:ProductAllComponent },
  { path:"product-single/:id", component:ProductDetailsComponent },

  { path:"user", component:UserComponent },
  { path:"user-details", component:UserDetailsComponent },
  { path:"user-address", component:UserAddressComponent },
  { path:"user-address-edit", component:UserAddressEditComponent },
  
  { path:"login", component:PageLoginComponent },
  { path:"signup", component:PageSignupComponent },
  { path:"forgot-password", component:PasswordForgotComponent },
  { path:"reset-password", component:PasswordResetComponent },

  { path:"about", component:PageAboutComponent},

  {path: 'admin', component: MainComponent, children:[
    {path: '',pathMatch:'full',redirectTo:'dashboard'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'users', component: UsersComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'orders', component: OrdersComponent},
  ]},

  {path: '404', component: PageNotfoundComponent},
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
