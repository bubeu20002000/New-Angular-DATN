import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogadduserComponent } from 'src/app/_helpers/dialogadduser/dialogadduser.component';
import { AdminService } from 'src/app/_services/admin.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  array: String[] = []
  data: any;
  dataSource: any;
  searchText: any;
  displayedColumns: string[] = ['index', 'username', 'email', 'role', 'phone_number', 'address_1', 'city', 'district', 'ward', 'actions'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private adminService: AdminService, private dialog: MatDialog, private token: TokenStorageService, private route: Router) { }

  ngOnInit(): void {
    this.array = this.token.getUser().roles
    if (this.array && this.array.includes('ROLE_ADMIN')) {
      this.getAllUser()
    } else {
      this.route.navigate(['/login'])
    }
  }

  getAllUser() {
    this.adminService.getAllUsers(this.token.getUser().id).subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(DialogadduserComponent)
  }

  delUser(id: any) {
    Swal.fire({
      title: 'Thông báo',
      text: "Bạn có muốn xoá không?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(id).subscribe(result => { }, error => {
          console.log(error), () => { console.log('ok') }
        })
        window.location.reload()
      }
    })

  }
}

