import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;
  count_prods: any;
  count_orders: any;
  count_users: any;
  count_prods_OOS: any;
  count_orders_Unfinish: any;
  sum_total: any;
  sum_monthly: any;
  month: any;

  array: String[] = []
  constructor(private adminService: AdminService, private datePipe: DatePipe, private token: TokenStorageService, private route: Router) { }

  ngOnInit(): void {
    this.array = this.token.getUser().roles
    if (this.array && this.array.includes('ROLE_ADMIN')) {
      this.month = this.datePipe.transform(new Date(), 'MM')
      this.getCountInfo(this.month)
    } else {
      this.route.navigate(['/login'])
    }
  }

  getCountInfo(month: any) {
    this.adminService.getCountInfo(month).subscribe(res => {
      this.count_prods = res['CountProds']
      this.count_prods_OOS = res['CountProds_OutOfStock']
      this.count_orders = res['CountOrders']
      this.count_orders_Unfinish = res['CountOrders_NotFinish']
      this.count_users = res['CountUsers']
      this.sum_total = res['SumTotal']
      this.sum_monthly = res['SumMonthly']
    })
  }



}
