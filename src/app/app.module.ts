import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductDetailsComponent } from './product-details/product-details.component';
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

import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterprodsPipe } from './_pipe/filterprods.pipe';
import { PageAboutComponent } from './page-about/page-about.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogimgComponent } from './_helpers/dialogimg/dialogimg.component';
import { DatePipe } from '@angular/common';
import { PageOrderSuccessComponent } from './page-order-success/page-order-success.component';
import { DashboardComponent } from './_admin/dashboard/dashboard.component';
import { UsersComponent } from './_admin/users/users.component';
import { ProductsComponent } from './_admin/products/products.component';
import { OrdersComponent } from './_admin/orders/orders.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TruncatePipe } from './_pipe/truncate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageHomeComponent,
    ProductDetailsComponent,
    PageCartComponent,
    PageCheckoutComponent,
    ProductAllComponent,
    UserComponent,
    PageOrderComponent,
    PageLoginComponent,
    PageSignupComponent,
    PasswordForgotComponent,
    UserDetailsComponent,
    UserAddressComponent,
    UserAddressEditComponent,
    PageNotfoundComponent,
    MainComponent,
    PasswordResetComponent,
    FilterprodsPipe,
    PageAboutComponent,
    DialogimgComponent,
    PageOrderSuccessComponent,
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    OrdersComponent,
    TruncatePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxPaginationModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [authInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
