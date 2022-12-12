import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiURLCategories= environment.apiUrl+'categories';
  constructor(private http: HttpClient) {
   }
   getCategories(): Observable<Category[]>{
       return this.http.get<Category[]>('http://localhost:3000/api/v1/categories')
   }
   getCategory(categoryId:string): Observable<Category>{
    return this.http.get<Category>(`http://localhost:3000/api/v1/categories/${categoryId}`)
}
   createCategory(category:Category): Observable<Category>{
    return this.http.post<Category>('http://localhost:3000/api/v1/categories',category)
   }
   deleteCategory(categoryId: string): Observable<unknown>{
    return this.http.delete<unknown>(`http://localhost:3000/api/v1/categories/${categoryId}`)
   }
   updateCategory(category:Category): Observable<Category>{
    return this.http.put<Category>(`http://localhost:3000/api/v1/categories/${category.id}`,category)
   }
   getCategoriesCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLCategories}/get/count`)
      .pipe(map((objectValue: any) => objectValue.count));
  }
}
