import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@group30/orders';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'adminapp-orders-list',
  templateUrl: './orders-list.component.html',
  styles: []
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus= {
    0: {
      label: 'Pending',
      color: 'primary'
    },
    1: {
      label: 'Processed',
      color: 'warning'
    },
    2: {
      label: 'Shipped',
      color: 'warning'
    },
    3: {
      label: 'Delivered',
      color: 'success'
    },
    4: {
      label: 'Failed',
      color: 'danger'
    }
  };
  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        );
      }
    });
  }
}
