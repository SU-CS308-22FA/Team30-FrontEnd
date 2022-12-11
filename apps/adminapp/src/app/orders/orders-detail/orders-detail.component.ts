import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@group30/orders';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'adminapp-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: []
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;
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
  onCancel() {
    this.location.back();
  }
  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location:Location
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(this.orderStatus).map((key) => {
      return {
        id: key,
        name: this.orderStatus[key].label
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService.getOrder(params.id).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event) {
    this.orderService.updateOrder({ status: event.value }, this.order.id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    );
    timer(2000)
              .toPromise()
              .then(() => {
                this.location.back();
              });
  }
}
