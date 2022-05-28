import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { FunctionsService } from '../_services/functions.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-page-order',
  templateUrl: './page-order.component.html',
  styleUrls: ['./page-order.component.css']
})
export class PageOrderComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private funtions: FunctionsService, private cartService: CartService) { }

  orders:any;
  new_orders:any;
  prods:any;
  pid:any;
  show = false;
  ngOnInit(): void {
    this.getOrders();
  }

  callLogout(){
    this.funtions.logout();
  }

  getOrders(){
    this.cartService.getOrders(this.tokenStorageService.getUser().id).subscribe(res=>{
      this.orders = res
      this.new_orders = this.orders.filter((x:any) => x.status !== 0);
    })
  }

  getDetailsOrder(id:any){
    this.show = true;
    this.pid = id;
    this.cartService.getProdOrder(id).subscribe(res=>{
      this.prods = res;
    })
  }


}
