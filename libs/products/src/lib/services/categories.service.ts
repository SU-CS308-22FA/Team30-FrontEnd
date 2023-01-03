import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiURLCategories= environment.apiUrl+'categories';
  constructor(private http: HttpClient) {
   }
   getCategories(): Observable<Category[]>{
       return this.http.get<Category[]>(this.apiURLCategories)
   }
   getCategory(categoryId:string): Observable<Category>{
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`)
}
   createCategory(category:Category): Observable<Category>{
    return this.http.post<Category>(this.apiURLCategories,category)
   }
   deleteCategory(categoryId: string): Observable<unknown>{
    return this.http.delete<unknown>(`${this.apiURLCategories}/${categoryId}`)
   }
   updateCategory(category:Category): Observable<Category>{
    return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category)
   }
   getCategoriesCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLCategories}/get/count`)
      .pipe(map((objectValue: any) => objectValue.count));
  }
}
