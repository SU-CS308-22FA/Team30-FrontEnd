import { Injectable } from '@angular/core';
import { LocalstorageService, User } from '@group30/users';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLAuth = environment.apiUrl + 'users';


  constructor(private http: HttpClient, private localStorageService: LocalstorageService, private router: Router) { }

  login(email:string,password:string): Observable<User>{
    return this.http.post<User>(`${this.apiURLAuth}/login`, {email:email, password:password});
  }
  logout(){
    this.localStorageService.removeItem();
    this.router.navigate(['/login']);
  }
}
