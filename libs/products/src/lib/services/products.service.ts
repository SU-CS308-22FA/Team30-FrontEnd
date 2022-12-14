import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiUrl + 'products';
  constructor(private http: HttpClient) {
   }
   getProducts(): Observable<Product[]>{
       return this.http.get<Product[]>(this.apiURLProducts)
   }
   getProduct(productId:string): Observable<Product>{
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`)
}
   createProduct(productData:FormData): Observable<Product>{
    return this.http.post<Product>(this.apiURLProducts,productData)
   }
   deleteProduct(productId: string): Observable<unknown>{
    return this.http.delete<unknown>(`${this.apiURLProducts}/${productId}`)
   }
   updateProduct(productData:FormData, productId:string): Observable<Product>{
    return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, productData)
   }
   getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.count));
  }
}
