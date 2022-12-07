import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@group30/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService} from 'primeng/api';


@Component({
    selector: 'adminapp-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit{
    products: Product[]=[];
    constructor(private productsService: ProductsService,private messageService:MessageService, private confirmationService: ConfirmationService, private router: Router){}
    ngOnInit(): void{
        this._getProducts()
    }
    deleteProduct(productId:string){
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService.deleteProduct(productId).subscribe(response=>{
                    this._getProducts();
                    this.messageService.add({severity:"success", summary:"Success",detail:"Product deleted succesfully"})
                },
                (error)=>{
                    this.messageService.add({severity:"error", summary:"Failed",detail:"Product is not deleted"})
                });
            },
            reject: (type)=>{
                console.log("Event rejected by user");
            }
            });
        }
        updateProduct(productId:string){
            this.router.navigateByUrl(`products/form/${productId}`)
        }
    private _getProducts(){
        this.productsService.getProducts().subscribe(prods=>{
            this.products= prods;
        })
    }
}
