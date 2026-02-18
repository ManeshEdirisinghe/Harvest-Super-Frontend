import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  showForm = false;

  newOrder = {
    customerName: '',
    itemName: '',
    qty: 1,
    unitPrice: 0,
    date: '',
    status: '',
  };

  orders: { customerName: string; itemName: string; qty: number; unitPrice: number; date: string; status: string }[] = [];

  addOrder() {
    if (this.newOrder.customerName && this.newOrder.itemName && this.newOrder.qty > 0 && this.newOrder.unitPrice > 0 && this.newOrder.status) {
      this.orders.push({ ...this.newOrder });
      this.newOrder = { customerName: '', itemName: '', qty: 1, unitPrice: 0, date: '', status: '' };
      this.showForm = false;
    }
  }

  deleteOrder(index: number) {
    this.orders.splice(index, 1);
  }
}
