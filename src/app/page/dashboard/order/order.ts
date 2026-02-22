import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderModel } from '../../../../model/type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {
  orderList: Array<OrderModel> = [];
  showForm = false;

  orderObj: OrderModel = {
    id: 0,
    date: new Date().toISOString().split('T')[0] // අද දිනය default ලෙස ඇතුළත් කිරීම
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.http.get<OrderModel[]>("http://localhost:8080/order/get-all").subscribe({
      next: (data) => {
        this.orderList = data;
        this.cdr.detectChanges();
      }
    });
  }

  toggleAddForm() {
    this.showForm = !this.showForm;
  }

  addOrder(): void {
    this.http.post("http://localhost:8080/order/add-order", this.orderObj).subscribe(data => {
      if (data === true) {
        Swal.fire({
          title: "Order Saved!",
          text: "Order ID: " + this.orderObj.id + " has been added.",
          icon: "success"
        });
        this.getAllOrders();
        this.showForm = false;
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.orderObj = { id: 0, date: new Date().toISOString().split('T')[0] };
  }
}
