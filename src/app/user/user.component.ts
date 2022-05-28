import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FunctionsService } from '../_services/functions.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentUser: any;
  user:any;
  name:any;
  email:any;
  phone_number:any;
  address:any;
  city:any;
  district:any;
  ward:any;
  constructor(
    private tokenStorageService: TokenStorageService
    , private funtions: FunctionsService
    , private userService: UserService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.userService.getInfo(this.currentUser.id).subscribe(res=>{
      this.name = res["username"]
      this.email = res["email"]
      this.address = res["address_1"]
      this.city = res["city"];
      this.district = res["district"]
      this.ward = res["ward"]
      this.phone_number = res["phone_number"]
    })
  }

  callLogout(){
    this.funtions.logout();
  }

  
}
