import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../_services/cart.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-page-cart',
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.css']
})
export class PageCartComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute, private cartService: CartService, private tokenStorageService: TokenStorageService) { }

  data: any;
  newList: any;
  total = 0;
  fee = 0;
  free = false;
  continue = false;
  ngOnInit(): void {
    this.getItemsCart()
  }

  getTransferFree() {
    if (this.total > 0 && this.total < 500000) {
      this.free = false;
      this.fee = 30000;
    } else {
      this.free = true;
      this.fee = 0;
    }
  }

  getItemsCart() {
    this.cartService.getItems(this.tokenStorageService.getUser().id).subscribe(res => {
      this.data = res;
      this.newList = Object.values(this.data.reduce(function (r: any, e: any) {
        var key = e.product.id + '|' + e.product.prodsize;
        if (!r[key]) r[key] = e;
        else {
          r[key].quantity += e.quantity;
        }
        return r;
      }, []))
      for (let i = 0; i < this.newList.length; i++) {
        let priceofOne = this.newList[i].quantity * this.newList[i].product.prodprice;
        this.total += priceofOne
        if (this.newList[i]['status'] == 0) {
          this.continue = true;
        } else {
          this.continue = false;
        }
      }
      this.getTransferFree();
      

    })

  }

  // checkout(){
  //   this.router.navigate(['check-out'], {relativeTo:this.route});
  // }

  delItem(id: any, name: any) {
    Swal.fire({
      icon: 'info',
      title: 'Thông báo',
      html: '<p>Bạn có muốn bỏ<br><strong>' + name + '</strong><br>này đi không?</p>',
      showDenyButton: true,
      confirmButtonText: 'Xác nhận',
      denyButtonText: `Từ chối`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.cartService.delItem(id).subscribe()) {
          return window.location.reload();
        }
      }
    })
  }

}
