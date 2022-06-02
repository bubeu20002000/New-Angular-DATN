import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8080/api/admin/';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private http: HttpClient) { }

  getCountInfo() {
    return this.http.get<any>(API_URL + 'count');
  }
  getAllUsers(){
    return this.http.get<any>(API_URL + 'user');
  }
  getAllProds(){
    return this.http.get<any>(API_URL + 'product');
  }
  getAllOrdersUnfinish(){
    return this.http.get<any>(API_URL + 'order_uf');
  }
  getAllOrdersDone(){
    return this.http.get<any>(API_URL + 'order_done');
  }
  

}
