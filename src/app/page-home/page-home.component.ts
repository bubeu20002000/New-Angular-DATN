import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
  content?: string;
  newProds: Product[]=[];
  filterM = {prodname: 'Nam'};
  filterW = {prodname: 'Nữ'};
  constructor(private userService: UserService, private prodService: ProductService) { }

  ngOnInit(): void {
    // this.userService.getPublicContent().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
    this.getNewProducts();
  }

  getNewProducts(){
    this.prodService.getNewProds().subscribe(res=>{
      this.newProds = res;
    })
  }


}
