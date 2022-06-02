import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/api/admin/';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  header: any;
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.tokenStorageService.getUser().token
    );
   }

  getCountInfo() {
    return this.http.get<any>(API_URL + 'count', { headers: this.header });
  }
  getAllUsers(){
    return this.http.get<any>(API_URL + 'user', { headers: this.header });
  }
  getAllProds(){
    return this.http.get<any>(API_URL + 'product', { headers: this.header });
  }
  getAllOrdersUnfinish(){
    return this.http.get<any>(API_URL + 'order_uf', { headers: this.header });
  }
  getAllOrdersDone(){
    return this.http.get<any>(API_URL + 'order_done', { headers: this.header });
  }
  updateOrder(id:any){
    return this.http.put<any>(API_URL + 'update_order/'+id,null, { headers: this.header });
  }
  

}
