import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../_services/functions.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { faCircleArrowLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService
    , private funtions: FunctionsService
    , private userService: UserService
    ) { }

  faCircleArrowLeft = faCircleArrowLeft;
  faPenToSquare = faPenToSquare;

  currentUser: any;
  currentData: any;

  currentAddr_1: any;
  currentCity: any;
  currentDistrict: any;
  currentWard: any;

  show: any;
  num: any;
  
  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.userService.getInfo(this.currentUser.id).subscribe(
      result => {
        this.currentData = result
        this.currentAddr_1 = result.address_1
        this.currentCity = result.city
        this.currentDistrict = result.district
        this.currentWard = result.ward
      }
    )
  }

  hidden(){
    this.show = !this.show;
  }

  callLogout(): void{
    this.funtions.logout();
  }

}
