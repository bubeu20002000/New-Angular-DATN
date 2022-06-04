import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialoginfoorderComponent } from 'src/app/_helpers/dialoginfoorder/dialoginfoorder.component';
import { AdminService } from 'src/app/_services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  range2 = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  dataUF: any;
  dataDN: any;
  dataSourceUF: any;
  dataSourceDN: any;
  searchTextUF: any;
  searchTextDN: any;
  displayedColumns: string[] = ['index', 'id', 'name', 'email', 'date', 'phone', 'total', 'status', 'paymentmethod', 'actions'];
  displayedColumns2: string[] = ['index', 'id', 'name', 'email', 'date', 'phone', 'total', 'status', 'paymentmethod'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  constructor(private adminService: AdminService, public dialog: MatDialog,private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.getAllOrderUF()
    this.getAllOrderDN()
  }

  getAllOrderUF() {
    this.adminService.getAllOrdersUnfinish().subscribe(res => {
      this.dataUF = res;
      this.dataSourceUF = new MatTableDataSource(this.dataUF);
      this.dataSourceUF.paginator = this.paginator;
    })
  }

  getAllOrderDN() {
    this.adminService.getAllOrdersDone().subscribe(res => {
      this.dataDN = res;
      this.dataSourceDN = new MatTableDataSource(this.dataDN);
      this.dataSourceDN.paginator = this.paginator;
    })
  }

  applyFilterUF(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUF.filter = filterValue.trim().toLowerCase();
  }
  applyFilterDN(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDN.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: any, name: any, user: any, email: any, date: any, phone: any, address1: any, city: any, district: any, ward: any, total: any, status: any, paymentmethod: any) {
    this.dialog.open(DialoginfoorderComponent, {
      data: {
        id: id,
        name: name,
        user: user,
        email: email,
        date: date,
        phone: phone,
        address1: address1,
        city: city,
        district: district,
        ward: ward,
        total: total,
        status: status,
        paymentmethod: paymentmethod
      }
    })
  }

  updateOrder(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Thông báo',
      text: 'Bạn có chắc chắn đơn hàng đã được thanh toán?',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: 'black',
      showCancelButton: true,
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.updateOrder(id).subscribe();
        window.location.reload();
      }
    })
  }


  get fromDateUF() { return this.datePipe.transform(this.range.get('start')?.value, 'dd-MM-yyyy'); }
  get toDateUF() { return this.datePipe.transform(this.range.get('end')?.value, 'dd-MM-yyyy'); }

  filterDateRangeUF() {
    this.dataSourceUF.filterPredicate = (data: any, filter: any) => {
      if (this.fromDateUF && this.toDateUF) {
        return data.date >= this.fromDateUF && data.date <= this.toDateUF;
      }
      return true;
    }
    this.dataSourceUF.filter = ''+Math.random();
  }

  get fromDateDN() { return this.datePipe.transform(this.range2.get('start')?.value, 'dd-MM-yyyy'); }
  get toDateDN() { return this.datePipe.transform(this.range2.get('end')?.value, 'dd-MM-yyyy'); }

  filterDateRangeDN() {
    this.dataSourceDN.filterPredicate = (data: any, filter: any) => {
      if (this.fromDateDN && this.toDateDN) {
        return data.date >= this.fromDateDN && data.date <= this.toDateDN;
      }
      return true;
    }
    this.dataSourceDN.filter = ''+Math.random();
  }

}
