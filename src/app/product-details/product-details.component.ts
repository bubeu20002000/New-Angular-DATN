import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../_services/cart.service';
import { ProductService } from '../_services/product.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  isLoggedIn: any;
  selected: any;
  id: any;
  user_id: any;
  details: any;
  prodname: any;
  sku: any;
  type: any;
  price: any;
  cate: any;
  img_one: any;
  img_two: any;
  description: any;
  color: any;
  status = false;
  instock: String[] = [];
  size: String[] = [];
  size_selected: any;
  check = false;
  stock: any;
  quantity = 1;
  constructor(private route: ActivatedRoute, private tokenStorageService: TokenStorageService, private router: Router, private prodService: ProductService, private cartService: CartService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.user_id = this.tokenStorageService.getUser().id;
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.getProdDetails();
  }

  getProdDetails() {
    this.prodService.getDetails(this.id).subscribe(res => {
      this.details = res;
      this.prodname = res['prodname'];
      this.sku = res['sku'];
      this.price = res['prodprice'];
      this.type = res['prodtype'];
      if (this.cate = res['categories']['catname'] == 'Men') {
        this.cate = 'Nam'
      } else {
        this.cate = 'Nữ'
      }
      if (res['prodimg1']) {
        this.img_one = 'assets/images/' + res['prodimg1'];
      }
      if (res['prodimg2']) {
        this.img_two = 'assets/images/' + res['prodimg2'];
      }
      this.description = res['proddescription'];
      this.color = res['prodcolor'];
      if (res['prodstatus'] == 0) {
        this.status = false
      } else {
        this.status = true
      }
      this.getSizes();
    })
  }

  getSizes() {
    this.prodService.getSizes(this.sku).subscribe(res => {
      Object.keys(res).forEach(r => {
        this.size.push(r)
        this.instock.push(res[r])
      })
    })
  }
  click(i: any, size: any) {
    this.selected = i;
    this.stock = this.instock[i];
    this.check = true;
    this.size_selected = size;
  }

  checkSize() {
    if (this.check && this.stock > 0) {
      return true;
    } else {
      return false;
    }
  }

  isLogged() {
    if (this.isLoggedIn) {
      if (this.checkSize()) {
        if (
          this.cartService.addtoCart(this.user_id, this.sku, this.size_selected, this.quantity).subscribe()
        ) {
          return Swal.fire({
            icon: 'info',
            title: 'Thông báo',
            text: 'Sản phẩm đã được thêm vào giỏ hàng',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'black'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Thông báo',
            text: 'Hết hàng',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'black'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
          return null;
        }
      } else {
        return Swal.fire({
          icon: 'info',
          title: 'Thông báo',
          text: 'Bạn chưa chọn kích cỡ',
          confirmButtonText: 'Xác nhận',
          confirmButtonColor: 'black'
        })
      }
    }
    else {
      return this.router.navigate(['/login']);
    }
  }
}
