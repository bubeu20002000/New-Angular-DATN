import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { FunctionsService } from '../_services/functions.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-page-checkout',
  templateUrl: './page-checkout.component.html',
  styleUrls: ['./page-checkout.component.css']
})
export class PageCheckoutComponent implements OnInit {

  City: any;
  District: any;
  Ward: any;

  newList: any;
  data: any;
  total = 0;
  free = false;
  fee = 0;

  total_plus = 0;//12
  date: any; //13
  status: any;//14

  cities: Array<any> = [];
  districts: Array<any> = [];
  filter_districts: Array<any> = [];
  wards: Array<any> = [];
  filter_wards: Array<any> = [];

  city_arr: Array<any> = [];
  district_arr: Array<any> = [];
  ward_arr: Array<any> = [];

  form: FormGroup;

  constructor(private route: Router, private datePipe: DatePipe, private cartService: CartService, private formBuilder: FormBuilder, private funtions: FunctionsService, private token: TokenStorageService) {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],//1
        address: ['', Validators.required],//2
        city: ['', Validators.required],//3
        district: ['', Validators.required],//4
        ward: ['', Validators.required],//5
        phone: [//6
          '',
          [
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.minLength(9),
            Validators.maxLength(11)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],//7
        zip: [''],//8
        address2: [''],//9
        company: [''],//10
        note: [''],//11
        payment: ['', Validators.required]//15
      }
    );

    this.date = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {

    this.getItemsCart();

    this.funtions.getAllCities().subscribe(res => {
      this.cities = res
    })

    this.funtions.getAllDistricts().subscribe(res => {
      this.districts = res
    })

    this.funtions.getAllWards().subscribe(res => {
      this.wards = res
    })

    if (this.token.getUser().address_1 != null) {
      this.form.controls['address'].setValue(this.token.getUser().address_1);
    } else {
      this.form.controls['address'].setValue('');
    }

    if (this.token.getUser().phone_number != null) {
      this.form.controls['phone'].setValue(this.token.getUser().phone_number);
    } else {
      this.form.controls['phone'].setValue('');
    }

    if (this.token.getUser().email != null) {
      this.form.controls['email'].setValue(this.token.getUser().email);
    } else {
      this.form.controls['email'].setValue('');
    }

  }

  getTransferFee() {
    if (this.total > 0 && this.total < 500000) {
      this.free = false;
      this.fee = 30000;
    } else {
      this.free = true;
      this.fee = 0;
    }
  }

  onSelectCity(city_id: any) {
    this.filter_wards = [];
    this.filter_districts = this.districts.filter((item) => {
      return item.province_code == city_id.value
    });
    this.city_arr = this.cities.filter((item) => {
      return item.code == city_id.value
    })
    for (var city of this.city_arr) {
      this.City = city.name;
    }
  }

  onSelectDistrict(district_id: any) {
    this.filter_wards = this.wards.filter((item) => {
      return item.district_code == district_id.value
    });

    this.district_arr = this.districts.filter((item) => {
      return item.code == district_id.value
    })
    for (var city of this.district_arr) {
      this.District = city.name;
    }
  }

  onSelectWard(ward_id: any) {
    this.ward_arr = this.wards.filter((item) => {
      return item.code == ward_id.value
    })
    for (var city of this.ward_arr) {
      this.Ward = city.name;
    }
  }

  getItemsCart() {
    this.cartService.getItems(this.token.getUser().id).subscribe(res => {
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
      }
      this.getTransferFee();
      this.total_plus = this.total + this.fee;

    })
  }

  order() {
    let data = {
      "name": this.form.controls['fullname'].value,
      "company": this.form.controls['company'].value,
      "address1": this.form.controls['address'].value,
      "address2": this.form.controls['address2'].value,
      "city": this.City,
      "district": this.District,
      "ward": this.Ward,
      "zipcode": this.form.controls['zip'].value,
      "phone": this.form.controls['phone'].value,
      "email": this.form.controls['email'].value,
      "date": this.date,
      "note": this.form.controls['note'].value,
      "total": this.total_plus,
      "status": this.status = 1,
      "paymentmethod": Number(this.form.controls['payment'].value)
    }
    if (this.cartService.updateOrder(this.token.getUser().id, data).subscribe()) {
      this.route.navigateByUrl('/order-success');
    }
  }
}
