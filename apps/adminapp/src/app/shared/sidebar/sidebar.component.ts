import { Component, OnInit } from '@angular/core';
import { AuthService } from '@group30/users';

@Component({
    selector: 'adminapp-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit{
    constructor (private authService: AuthService){}
    ngOnInit(): void {
        
    }
    logoutUser(){
        this.authService.logout();
    }
}
