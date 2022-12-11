import { Injectable } from '@angular/core';

const TOKEN= 'jwtToken';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  setItem(data){
    localStorage.setItem(TOKEN,data);
  }
  getItem(): string{
    return localStorage.getItem(TOKEN);
  }
  removeItem(){
    localStorage.removeItem(TOKEN);
  }
}
