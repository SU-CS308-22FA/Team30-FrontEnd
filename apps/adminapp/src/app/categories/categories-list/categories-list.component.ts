import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@group30/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService} from 'primeng/api';


@Component({
    selector: 'adminapp-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit{
    categories: Category[]=[];
    constructor(private categoriesService: CategoriesService,private messageService:MessageService, private confirmationService: ConfirmationService, private router: Router){}
    ngOnInit(): void{
        this._getCategories()
    }
    deleteCategory(categoryId:string){
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(response=>{
                    this._getCategories();
                    this.messageService.add({severity:"success", summary:"Success",detail:"Category deleted succesfully"})
                },
                (error)=>{
                    this.messageService.add({severity:"error", summary:"Failed",detail:"Category is not deleted"})
                });
            },
            reject: (type)=>{
                console.log("Event rejected by user");
            }
            });
        }
        updateCategory(categoryId:string){
            this.router.navigateByUrl(`categories/form/${categoryId}`)
        }
    private _getCategories(){
        this.categoriesService.getCategories().subscribe(cats=>{
            this.categories= cats;
        })
    }
}
