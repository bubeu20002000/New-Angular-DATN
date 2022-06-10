import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const API_URL = "http://nnn-env.eba-43umkkn4.us-east-1.elasticbeanstalk.com/api/order/"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  header: any;
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    const Bearer ="Bearer " + this.tokenStorageService.getUser().token
    this.header = new HttpHeaders().set(
      "Authorization",
       Bearer
    );
  }
  addtoCart(id: any,sku: any,size:any,qty: any): Observable<any> {
    return this.http.post<any>(API_URL + 'add/' + id + '/' + sku + '/'+ size + '/' + qty, {headers: this.header });
  }
  getItems(id:any){
    return this.http.get<any>(API_URL + 'get/'+id,{headers: this.header })
  }
  delItem(pid:any):Observable<any>{
    return this.http.delete<any>(API_URL + 'del/' +pid,{headers: this.header })
  }
  updateOrder(id:any, data:any){
    return this.http.post<any>(API_URL + 'update/' + id,data, {headers: this.header });
  }
  getOrders(id:any){
    return this.http.get<any>(API_URL + 'get-order/'+id,{headers: this.header })
  }
  getProdOrder(id:any){
    return this.http.get<any>(API_URL + 'get-prod-order/'+id,{headers: this.header })
  }
}
