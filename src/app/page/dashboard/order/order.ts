import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderModel, CustomerModel, ItemModel, OrderDetailModel } from '../../../../model/type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements OnInit {
  // Lists fetched from the database
  orderList: Array<OrderModel> = [];
  customerList: Array<CustomerModel> = [];
  itemList: Array<ItemModel> = [];

  // Cart for Order Details
  cartItems: Array<OrderDetailModel> = [];

  showForm = false;

  // Main Order Object
  orderObj: OrderModel = {
    orderId: '',
    date: new Date().toISOString().split('T')[0], // Defaults to today
    custId: ''
  };

  // Temporary object for adding items to the cart
  tempOrderDetail: OrderDetailModel = {
    orderId: '',
    itemCode: '',
    qty: 1,
    discount: 0
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAllOrders();
    this.getAllCustomers();
    this.getAllItems();
  }

  getAllCustomers() {
    this.http.get<CustomerModel[]>("http://localhost:8080/customer/get-all").subscribe(data => {
      this.customerList = data;
    });
  }

  getAllItems() {
    this.http.get<ItemModel[]>("http://localhost:8080/item/get-all").subscribe(data => {
      this.itemList = data;
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

  // Add selected item to the cart table
  addToCart() {
    if (!this.tempOrderDetail.itemCode) {
      Swal.fire("Warning", "Please select an item first!", "warning");
      return;
    }

    this.tempOrderDetail.orderId = this.orderObj.; // Sync Order ID
    this.cartItems.push({ ...this.tempOrderDetail }); // Push a copy to the array

    // Reset temp item fields
    this.tempOrderDetail = {
      orderId: this.orderObj.id,
      itemCode: '',
      qty: 1,
      discount: 0
    };
  }

  // Remove an item from the cart
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  // Submit the final Order and Order Details to the backend
  placeOrder(): void {
    if (!this.orderObj.id || !this.orderObj.custId) {
      Swal.fire("Warning", "Please fill in Order ID and select a Customer!", "warning");
      return;
    }
    if (this.cartItems.length === 0) {
      Swal.fire("Warning", "Please add at least one item to the order!", "warning");
      return;
    }

    // NOTE: This payload structure depends on your Spring Boot DTO.
    // We may need to adjust this once you provide your Java Controller code.
    const payload = {
      order: this.orderObj,
      orderDetails: this.cartItems
    };

    console.log("Submitting Order:", payload);

    this.http.post("http://localhost:8080/order/place-order", payload).subscribe({
      next: (res) => {
        if (res === true || res) {
          Swal.fire("Success", "Order Placed Successfully!", "success");
          this.getAllOrders();
          this.showForm = false;
          this.resetForm();
        }
      },
      error: (err) => {
        Swal.fire("Error", "Failed to place order.", "error");
        console.error(err);
      }
    });
  }

  resetForm() {
    this.orderObj = { id: '', date: new Date().toISOString().split('T')[0], custId: '' };
    this.cartItems = [];
  }
}
