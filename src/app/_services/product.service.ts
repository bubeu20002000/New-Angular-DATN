import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const API_URL = "http://localhost:8080/api/product/"
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  header: any;
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.tokenStorageService.getUser().token
    );
  }
  getAll(page: any, size: any, field: any): Observable<any> {
    return this.http.post<any>(API_URL + 'products/' + page + '/' + size, field);
  }

  getInfo() {
    return this.http.get<any>(API_URL + 'products-info');
  }

  getDetails(id: any) {
    return this.http.get<any>(API_URL + 'product-details/' + id);
  }

  getSizes(sku: any) {
    return this.http.get<any>(API_URL + 'product-details-sku/' + sku);
  }

  getNewProds(){
    return this.http.get<any>(API_URL + 'new-products');
  }

}
