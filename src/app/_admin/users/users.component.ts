import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data: any;
  dataSource:any;
  searchText: any;
  displayedColumns: string[] = ['index','username', 'email', 'phone_number','address_1','city','district','ward'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllUser()
  }

  getAllUser() {
    this.adminService.getAllUsers().subscribe(res => {
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

