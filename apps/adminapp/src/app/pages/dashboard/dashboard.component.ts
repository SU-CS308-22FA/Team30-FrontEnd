import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@group30/orders';
import { ProductsService } from '@group30/products';
import { UsersService } from '@group30/users';
import { combineLatest } from 'rxjs';
import { CategoriesService } from '@group30/products';

@Component({
  selector: 'adminapp-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  statistics = [];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService,
    private categoriesService:CategoriesService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales(),
      this.categoriesService.getCategoriesCount()
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}
