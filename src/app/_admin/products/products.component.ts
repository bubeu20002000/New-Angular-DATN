import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  data: any;
  dataSource: any;
  searchText: any;
  displayedColumns: string[] = ['index', 'sku', 'prodname', 'prodtype', 'prodsize', 'prodcolor', 'prodprice', 'prodinstock', 'prodstatus', 'proddiscount', 'prodimg1', 'prodimg2', 'proddescription'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  constructor(private adminService: AdminService) { }

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
}
