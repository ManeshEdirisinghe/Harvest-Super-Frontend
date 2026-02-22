import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderModel, CustomerModel } from '../../../../model/type'; // Import both models
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [CommonModule, FormsModule] ...
})
export class Order implements OnInit {
  orderList: Array<OrderModel> = [];
  customerList: Array<CustomerModel> = []; // Customer ලා තෝරන්න ලිස්ට් එකක්
  showForm = false;

  orderObj: OrderModel = {
    id: '',
    date: new Date().toISOString().split('T')[0],
    custId: ''
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAllOrders();
    this.getAllCustomers(); // Customer ලා ටිකත් මුලින්ම load කරගන්නවා
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

  orderObj: OrderModel = {
  id: '',
  date: new Date().toISOString().split('T')[0],
  custId: ''
};

addOrder(): void {
  console.log("Saving Order:", this.orderObj);
  this.http.post("http://localhost:8080/order/add-order", this.orderObj).subscribe(data => {
    if (data === true) {
      Swal.fire({
        title: "Order Placed!",
        text: `Order ${this.orderObj.id} for Customer ${this.orderObj.custId} saved.`,
        icon: "success"
      });
      this.getAllOrders();
      this.showForm = false;
    }
  });
}

}
