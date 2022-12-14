import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from 'environments/environment';
const API_URL = environment.apiUrl;
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localStorageService:LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token= this.localStorageService.getItem();
    const isApiUrl= request.url.startsWith(API_URL);
    if(token && isApiUrl){
      request= request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      }
      )
    }
    return next.handle(request);
  }
}
