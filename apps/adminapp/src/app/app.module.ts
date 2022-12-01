import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { CategoriesService } from '@group30/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';


const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent
            }
        ]
    }
];

@NgModule({
    declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent],
    imports: [BrowserModule, RouterModule.forRoot(routes), BrowserAnimationsModule, CardModule, ToolbarModule, ButtonModule, TableModule, HttpClientModule,InputTextModule,FormsModule,ReactiveFormsModule, ToastModule,ConfirmDialogModule,ColorPickerModule],
    providers: [CategoriesService,MessageService,ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
