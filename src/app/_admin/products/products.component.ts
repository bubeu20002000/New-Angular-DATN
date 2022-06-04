import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogaddprodComponent } from 'src/app/_helpers/dialogaddprod/dialogaddprod.component';
import { DialogfixprodComponent } from 'src/app/_helpers/dialogfixprod/dialogfixprod.component';
import { DialoginfoprodComponent } from 'src/app/_helpers/dialoginfoprod/dialoginfoprod.component';
import { AdminService } from 'src/app/_services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  data: any;
  dataSource: any;
  searchText: any;
  displayedColumns: string[] = ['index', 'sku', 'prodname', 'prodtype', 'categories', 'prodsize', 'prodcolor', 'prodprice', 'prodinstock', 'prodstatus', 'proddiscount', 'actions']; //'prodimg1', 'prodimg2', 'proddescription',
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  constructor(private adminService: AdminService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllProd()
  }

  getAllProd() {
    this.adminService.getAllProds().subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(sku: any, prodname: any, prodtype: any, prodcolor: any, prodsize: any, prodinstock: any, prodprice: any, prodstatus: any, proddescription: any, prodimg1: any, prodimg2: any, proddiscount: any, categories: any) {
    this.dialog.open(DialoginfoprodComponent, {
      data: {
        sku: sku,
        prodname: prodname,
        prodtype: prodtype,
        prodcolor: prodcolor,
        prodsize: prodsize,
        prodinstock: prodinstock,
        prodprice: prodprice,
        prodstatus: prodstatus,
        proddescription: proddescription,
        prodimg1: prodimg1,
        prodimg2: prodimg2,
        proddiscount: proddiscount,
        categories: categories
      }
    })
  }

  delProd(id: any, name: any) {
    Swal.fire({
      title: 'Thông báo',
      html: "Bạn có muốn xóa <p>" + name + - id + "<p> không?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteProd(id).subscribe()
        window.location.reload()
      }
    })
  }

  fixProd(id: any, sku: any, prodname: any, prodtype: any, prodcolor: any, prodsize: any, prodinstock: any, prodprice: any, prodstatus: any, proddescription: any, prodimg1: any, prodimg2: any, proddiscount: any, categories: any) {
    this.dialog.open(DialogfixprodComponent, {
      data: {
        id: id,
        sku: sku,
        prodname: prodname,
        prodtype: prodtype,
        prodcolor: prodcolor,
        prodsize: prodsize,
        prodinstock: prodinstock,
        prodprice: prodprice,
        prodstatus: prodstatus,
        proddescription: proddescription,
        prodimg1: prodimg1,
        prodimg2: prodimg2,
        proddiscount: proddiscount,
        categories: categories
      }
    })
  }

  addProd() {
    this.dialog.open(DialogaddprodComponent)
  }
}
