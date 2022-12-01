import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category } from '@group30/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
    selector: 'adminapp-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit{
    form: FormGroup;
    isSubmitted= false;
    editMode= false;
    curId: string;
    constructor(private formBuilder: FormBuilder, private categoriesService:CategoriesService, private messageService:MessageService, private location:Location, private route:ActivatedRoute){

    }
    ngOnInit(): void {
        this.form=this.formBuilder.group({
            name:['',Validators.required],
            icon:['',Validators.required],
            color: ['#fff']
        });
        this._checkEditMode();
    }
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
          return;
        }
        const category: Category = {
          id: this.curId,
          name: this.CategoryForm.name.value,
          icon: this.CategoryForm.icon.value,
          color: this.CategoryForm.color.value
        };
        if (this.editMode) {
          this._updateCategory(category);
        } else {
          this._addCategory(category);
        }
      }
      onCancel() {
        this.location.back();
      }
      private _checkEditMode() {
        this.route.params.subscribe((params) => {
          if (params.id) {
            this.editMode = true;
            this.curId = params.id;
            this.categoriesService.getCategory(params.id).subscribe((category) => {
              this.CategoryForm.name.setValue(category.name);
              this.CategoryForm.icon.setValue(category.icon);
              this.CategoryForm.color.setValue(category.color);
            });
          }
        });
      }
    get CategoryForm(){
        return this.form.controls;
    }  
    private _addCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe(
          (category: Category) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Category ${category.name} is created!`
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
              detail: 'Category is not created!'
            });
          }
        );
      }
    private _updateCategory(category:Category){
        this.categoriesService.updateCategory(category).subscribe(response=>{
            this.messageService.add({severity:"success", summary:"Success",detail:"Category updated succesfully"})
            timer(2000).toPromise().then(done=>{
                this.location.back();
            })
        },
        (error)=>{
            this.messageService.add({severity:"error", summary:"Failed",detail:"Category not updated"})
        });
    }
}
