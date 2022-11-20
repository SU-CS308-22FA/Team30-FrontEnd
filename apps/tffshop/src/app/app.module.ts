import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from 'libs/ui/src/lib/ui.module';
import {AccordionModule} from 'primeng/accordion';


const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'products',
        component: ProductListComponent
    }
];
@NgModule({
    declarations: [AppComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent],
    imports: [BrowserModule, RouterModule.forRoot(routes), UiModule,AccordionModule,BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
