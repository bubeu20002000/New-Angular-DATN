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

  getCountInfo(month:any) {
    return this.http.get<any>(API_URL + 'count/'+month, { headers: this.header });
  }
  getAllUsers(id:any){
    return this.http.get<any>(API_URL + 'user/'+id, { headers: this.header });
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
  updateProd(id:any,cid:any, data:any){
    return this.http.put<any>(API_URL + 'update_prod/'+id+'/'+cid,data, { headers: this.header });
  }
  deleteProd(id:any){
    return this.http.delete<any>(API_URL + 'delete_prod/'+id,{ headers: this.header });
  }
  addProd(cid:any,data:any){
    return this.http.post<any>(API_URL + 'add_prod/'+cid,data,{ headers: this.header });
  }
  deleteUser(id:any){
    return this.http.delete<any>(API_URL + 'delete_user/'+id,{ headers: this.header });
  }
}
