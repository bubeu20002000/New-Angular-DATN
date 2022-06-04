import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/_services/admin.service';
import Swal from 'sweetalert2';
import { Infoprod } from '../infoprod';

@Component({
  selector: 'app-dialogfixprod',
  templateUrl: './dialogfixprod.component.html',
  styleUrls: ['./dialogfixprod.component.css']
})
export class DialogfixprodComponent implements OnInit {
  formFix: FormGroup;
  sku: any;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Infoprod, private adminService: AdminService) {
    this.formFix = this.formBuilder.group({
      sku: ['', Validators.required],
      prodname: ['', Validators.required],
      prodtype: ['', Validators.required],
      prodcolor: ['', Validators.required],
      prodsize: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      prodinstock: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      prodprice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      prodstatus: ['', Validators.required],
      proddescription: ['', Validators.required],
      prodimg1: ['', Validators.required],
      prodimg2: ['', Validators.required],
      proddiscount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      categories: ['', Validators.required],
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formFix.controls;
  }

  ngOnInit(): void {
    this.formFix.patchValue({
      sku: this.data.sku,
      prodname: this.data.prodname,
      prodtype: this.data.prodtype,
      prodcolor: this.data.prodcolor,
      prodsize: this.data.prodsize,
      prodinstock: this.data.prodinstock,
      prodprice: this.data.prodprice,
      prodstatus: this.data.prodstatus,
      proddescription: this.data.proddescription,
      prodimg1: this.data.prodimg1,
      prodimg2: this.data.prodimg2,
      proddiscount: this.data.proddiscount,
      categories: this.data.categories.catid
    })
  }

  Fix() {
    let id = this.data.id
    let categories = this.formFix.controls.categories.value
    let data = {
      sku: this.formFix.controls.sku.value,
      prodname: this.formFix.controls.prodname.value,
      prodtype: this.formFix.controls.prodtype.value,
      prodcolor: this.formFix.controls.prodcolor.value,
      prodsize: this.formFix.controls.prodsize.value,
      prodinstock: this.formFix.controls.prodinstock.value,
      prodprice: this.formFix.controls.prodprice.value,
      prodstatus: this.formFix.controls.prodstatus.value,
      proddescription: this.formFix.controls.proddescription.value,
      prodimg1: this.formFix.controls.prodimg1.value,
      prodimg2: this.formFix.controls.prodimg2.value,
      proddiscount: this.formFix.controls.proddiscount.value,
    }
    Swal.fire({
      title: 'Thông báo',
      text: "Bạn có muốn sửa không?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText:'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.updateProd(id,categories,data).subscribe()
        window.location.reload()
      }
    })
  }

}
