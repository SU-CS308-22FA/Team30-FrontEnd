import { Location } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, Product } from '@group30/products';
import { CategoriesService, Category } from '@group30/products';

import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
    selector: 'adminapp-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit{
    form: FormGroup;
    isSubmitted= false;
    categories  =[];
    editMode= false;
    curId: string;
    imageDisplay: string | ArrayBuffer;
    constructor(private formBuilder: FormBuilder, private productsService:ProductsService,private categoriesService:CategoriesService ,private messageService:MessageService, private location:Location, private route:ActivatedRoute){

    }
    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
    }
    private _checkEditMode(){
        this.route.params.subscribe((params)=>{
            if(params.id){
                this.editMode=true;
                this.curId=params.id;
                this.productsService.getProduct(params.id).subscribe((product)=>{
                    this.ProductForm.name.setValue(product.name);
                    this.ProductForm.description.setValue(product.description);
                    this.ProductForm.team.setValue(product.team);
                    this.ProductForm.price.setValue(product.price);
                    this.ProductForm.size.setValue(product.size);
                    this.ProductForm.category.setValue(product.category.id);
                    this.ProductForm.countInStock.setValue(product.countInStock);
                    this.ProductForm.richDescription.setValue(product.richDescription);
                    this.ProductForm.isDiscounted.setValue(product.isDiscounted);
                    this.ProductForm.isFeatured.setValue(product.isFeatured);
                    this.imageDisplay=product.image;
                    this.ProductForm.image.setValidators([]);
                    this.ProductForm.image.updateValueAndValidity();
                })
            }
        })
    }
    private _initForm(){
        this.form=this.formBuilder.group({
            name: ['',Validators.required],
            description: ['',Validators.required],
            team: ['',Validators.required],
            price: ['',Validators.required],
            size: ['',Validators.required],
            category: ['',Validators.required],
            countInStock: ['',Validators.required],
            richDescription: [''],
            image: ['',Validators.required],
            isFeatured: [false],
            isDiscounted: [false]
        })
    }
    private _getCategories(){
        this.categoriesService.getCategories().subscribe(cats=>{
            this.categories=cats;
        })
    }
      onCancel() {
        this.location.back();
      }
      onSubmit() {
        this.isSubmitted=true;
        if(this.form.invalid){
            return;
        }
        const productformData= new FormData();
        Object.keys(this.ProductForm).map((key)=>{
            productformData.append(key,this.ProductForm[key].value);
        });
        if(this.editMode){
            this._updateProduct(productformData);
        }else{
        this._addProduct(productformData);
        }
      }  
      private _updateProduct(productData:FormData){
        this.productsService.updateProduct(productData,this.curId).subscribe(()=>{
            this.messageService.add({
                severity:"success",
                summary:"Success",
                detail:"Product is updated!"
                        });
                        timer(2000)
                        .toPromise()
                        .then(()=>{
                            this.location.back();
                        });
        },
        ()=>{
            this.messageService.add({
                severity:"error",
                summary:"Error",
                detail:"Product is not updated!"
            });
        }
        )
      }
      private _addProduct(productData: FormData) {
        this.productsService.createProduct(productData).subscribe(
          (product: Product) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Product ${product.name} is created!`
            });
            timer(2000)
              .toPromise()
              .then(() => {
                this.location.back();
              });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not created!'
            });
          }
        );
      }
    get ProductForm(){
        return this.form.controls;
    }  
    onImageUpload(event){
        const File= event.target.files[0];
        if(File){
            this.form.patchValue({image:File});
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload=()=>{
                this.imageDisplay=fileReader.result;
            };
            fileReader.readAsDataURL(File);
        }
    }
}