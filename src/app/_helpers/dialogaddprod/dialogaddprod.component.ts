import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/_services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogaddprod',
  templateUrl: './dialogaddprod.component.html',
  styleUrls: ['./dialogaddprod.component.css']
})
export class DialogaddprodComponent implements OnInit {
  formFix: FormGroup;
  constructor(private formBuilder: FormBuilder,private adminService: AdminService) {
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
  }

  Add(){
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
      text: "Bạn có muốn thêm không?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText:'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.addProd(categories,data).subscribe()
        window.location.reload()
      }
    })
  }

}
