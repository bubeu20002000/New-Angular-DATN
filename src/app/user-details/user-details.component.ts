import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FunctionsService } from '../_services/functions.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phoneNumber: new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('[0-9]*')
    ])
  });

  email: any;
  phone: any;

  constructor(private tokenStorageService: TokenStorageService
    , private funtions: FunctionsService
    , private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getInfo(this.tokenStorageService.getUser().id).subscribe(res => {
      this.email = res["email"]
      this.phone = res["phone_number"]
    })
  }

  callLogout() {
    this.funtions.logout();
  }

  get primEmail() {
    return this.userEmails.get('primaryEmail')
  }
  get phoneNumber() {
    return this.userEmails.get('phoneNumber')
  }

  changeEmail() {
    window.location.reload()
    this.userService.updateEmail(this.tokenStorageService.getUser().id, this.primEmail?.value)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  changePN(){
    window.location.reload()
    this.userService.updatePhoneNumber(this.tokenStorageService.getUser().id, this.phoneNumber?.value)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
