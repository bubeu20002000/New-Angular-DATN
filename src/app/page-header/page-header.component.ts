import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input() isLoggedIn: any;
  @Input() showAdminBoard: any;

  url: any;
  data: any;
  newList:any;
  total = 0;

  constructor(private cartService: CartService, private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    // this.getItemsCart();
  }

  isLogged() {
    if (!this.isLoggedIn) {
      return this.router.navigate(['/login']);
    } else {
      return this.router.navigate(['/user']);
    }
  }

  logout(): void {
    if (this.router.url === '/orders'
      || this.router.url === '/user'
      || this.router.url === '/login'
      || this.router.url === '/user-details'
      || this.router.url === '/user-details-edit'
      || this.router.url === '/user-address'
      || this.router.url === '/cart'
    ) {
      this.tokenStorageService.signOut();
      window.location.replace("/");
    } else {
      this.tokenStorageService.signOut();
      window.location.reload();
    }
  }
  // getItemsCart() {
  //   this.cartService.getItems(this.tokenStorageService.getUser().id).subscribe(res => {
  //     this.data = res;
  //     this.newList = Object.values(this.data.reduce(function (r: any, e: any) {
  //       var key = e.product.id + '|' + e.product.prodsize;
  //       if (!r[key]) r[key] = e;
  //       else {
  //         r[key].quantity += e.quantity;
  //         // r[key].instances += e.instances
  //       }
  //       return r;
  //     }, []))

  //     for(let i = 0;i<this.newList.length;i++){
  //       let priceofOne = this.newList[i].quantity * this.newList[i].product.prodprice;
  //       this.total += priceofOne
  //     }
  //   })
  // }

}
