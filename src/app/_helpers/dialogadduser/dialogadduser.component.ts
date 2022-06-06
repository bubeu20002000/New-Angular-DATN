import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-dialogadduser',
  templateUrl: './dialogadduser.component.html',
  styleUrls: ['./dialogadduser.component.css']
})
export class DialogadduserComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null,
    role: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  list: String[]=[];
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password, role } = this.form;
    this.list.push(role);
    this.authService.addUser(username, email, password, this.list).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        window.location.reload()
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
