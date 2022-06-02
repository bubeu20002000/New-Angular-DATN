import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data:any;
  count_prods:any;
  count_orders:any;
  count_users:any;
  count_prods_OOS:any;
  count_orders_Unfinish:any;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getCountInfo()
  }

  getCountInfo(){
    this.adminService.getCountInfo().subscribe(res=>{
      this.count_prods = res['CountProds']
      this.count_prods_OOS = res['CountProds_OutOfStock']
      this.count_orders = res['CountOrders']
      this.count_orders_Unfinish = res['CountOrders_NotFinish']
      this.count_users = res['CountUsers']
    })
  }

  

}
