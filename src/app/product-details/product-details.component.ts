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
  prodname: any;
  sku: any;
  type: any;
  price: number[] = [];
  price_selected = 0;
  discount: number[] = [];
  discount_selected = 0;
  only_price: any;
  only_discount: any;
  show = false;
  same = false;
  discount_show = false;
  price_show = false;
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

  min = 0;
  max = 0;
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
      this.prodname = res['prodname'];
      this.sku = res['sku'];
      this.only_price = res['prodprice'];
      this.only_discount = res['proddiscount'];

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
      this.getPrice();

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

  getPrice() {
    this.prodService.getPrice(this.sku).subscribe(res => {
      Object.keys(res).forEach(r => {
        this.price.push(res[r].split(',')[0]);
        this.discount.push(res[r].split(',')[1]);
      })
      this.min = this.discount.reduce((a, b) => Math.min(a, b));
      this.max = this.discount.reduce((a, b) => Math.max(a, b));
      if (this.min == this.max) {
        this.same = true;
      } else {
        this.same = false;
      }
    })
  }

  click(i: any, size: any) {
    this.selected = i;
    this.check = true;
    this.size_selected = size;

    this.stock = this.instock[i];
    this.price_selected = this.price[i];
    this.discount_selected = this.discount[i];

    if (this.price_selected != this.discount_selected) {
      this.show = true;
      this.discount_show = true;
      this.price_show = false;
    } else {
      this.show = true;
      this.price_show = true;
      this.discount_show = false;
    }

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
