import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  header: any;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.tokenStorageService.getUser().token
    );
  }

  updateAddr(id: any, data: any): Observable<any> {
    return this.http.put(API_URL + 'update/' + id, data, { headers: this.header });
  }
  getInfo(id: any): Observable<any> {
    return this.http.get(API_URL + id, { headers: this.header });
  }

  updateEmail(id: any, data: any): Observable<any> {
    return this.http.put(API_URL + 'updateEmail/' + id, data, { headers: this.header });
  }

  updatePhoneNumber(id: any, data: any): Observable<any> {
    return this.http.put(API_URL + 'updatePhoneNumber/' + id, data, { headers: this.header });
  }

  sendEmail(email: any) {
    return this.http.get(API_URL + 'send/' + email);
  }

  getInfobyEmail(email: any): Observable<any> {
    return this.http.get(API_URL + 'info/' + email);
  }

  changeP(t:any, p:any): Observable<any>{
    return this.http.put(API_URL + 'update-p/' + t,p);
  }
}
