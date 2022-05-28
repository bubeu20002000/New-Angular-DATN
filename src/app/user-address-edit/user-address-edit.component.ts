import { Component, Input, OnInit } from '@angular/core';
import { FunctionsService } from '../_services/functions.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-address-edit',
  templateUrl: './user-address-edit.component.html',
  styleUrls: ['./user-address-edit.component.css']
})
export class UserAddressEditComponent implements OnInit {

  @Input() Addr_1: any;
  @Input() City: any;
  @Input() District: any;
  @Input() Ward: any;
  currentUser: any;
  cities: Array<any>=[];
  districts: Array<any>=[];
  filter_districts: Array<any>=[];
  wards: Array<any>=[];
  filter_wards: Array<any>=[];

  test: Array<any> = [];
  testz: Array<any> = [];
  testzz: Array<any> = [];

  constructor(private tokenStorageService: TokenStorageService
    , private funtions: FunctionsService
    , private userService: UserService
    )
    { }
  
  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();

    this.funtions.getAllCities().subscribe(res =>{
      this.cities = res
    })

    this.funtions.getAllDistricts().subscribe(res =>{
      this.districts = res
    })

    this.funtions.getAllWards().subscribe(res =>{
      this.wards = res
    })
  }

  onSelectCity(city_id: any) {
    // this.selectedCity = city_id.value;
    // this.selectedDistrict = 0;
    this.filter_wards = [];
    this.filter_districts = this.districts.filter((item) => {
      return item.province_code == city_id.value
    });
    this.test = this.cities.filter((item)=>{
      return item.code == city_id.value
    })
    for(var city of this.test){
      this.City = city.name;
    }
    
  }

  onSelectDistrict(district_id: any) {
    // this.selectedDistrict = state_id.value;
    this.filter_wards = this.wards.filter((item) => {
      return item.district_code == district_id.value
    });

    this.testz = this.districts.filter((item)=>{
      return item.code == district_id.value
    })
    for(var city of this.testz){
      this.District = city.name;
    }
  }

  onSelectWard(ward_id:any){
    this.testzz = this.wards.filter((item)=>{
      return item.code == ward_id.value
    })
    for(var city of this.testzz){
      this.Ward = city.name;
    }
  }

  callLogout(){
    this.funtions.logout();
  }

  updateAddr(){
    window.location.reload();
    const data = {
      address_1: this.Addr_1,
      city: this.City,
      district: this.District,
      ward: this.Ward
    };
    this.userService.updateAddr(this.currentUser.id, data)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
}
