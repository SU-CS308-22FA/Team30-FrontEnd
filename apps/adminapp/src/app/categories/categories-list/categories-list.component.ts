import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@group30/products';

@Component({
    selector: 'adminapp-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit{
    categories: Category[]=[];
    constructor(private categoriesService: CategoriesService){}
    ngOnInit(): void{
        this.categoriesService.getCategories().subscribe(cats=>{
            this.categories= cats;
        })
    }
}
