import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderModel, CustomerModel } from '../../../../model/type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements OnInit {
  orderList: Array<OrderModel> = [];
  customerList: Array<CustomerModel> = [];
  showForm = false;

  orderObj: OrderModel = {
  orderId: 0,
  date: new Date().toISOString().split('T')[0],
  custID: ''
};

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAllOrders();
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.http.get<CustomerModel[]>("http://localhost:8080/customer/get-all").subscribe(data => {
      this.customerList = data;
    });
  }

  getAllOrders() {
    this.http.get<OrderModel[]>("http://localhost:8080/order/get-all").subscribe(data => {
      this.orderList = data;
      this.cdr.detectChanges();
    });
  }

  toggleAddForm() {
    this.showForm = !this.showForm;
  }

  addOrder(): void {
    this.http.post("http://localhost:8080/order/add-order", this.orderObj).subscribe(data => {
      if (data === true) {
        Swal.fire("Success", "Order Added!", "success");
        this.getAllOrders();
        this.showForm = false;
        this.resetForm();
      }
    });
  }

resetForm() {
  this.orderObj = {
    orderId: 0,
    date: new Date().toISOString().split('T')[0],
    custID: ''
  };
}
}
