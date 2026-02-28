import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderDetailModel, ItemModel } from '../../../../model/type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css'
})
export class OrderDetails implements OnInit {
  orderDetailList: Array<OrderDetailModel> = [];
  itemList: Array<ItemModel> = [];

  showForm = false;

  orderDetailObj: OrderDetailModel = {
    orderId: '',
    itemCode: '',
    qty: 1,
    discount: 0
  };

  selectedOrderDetail: OrderDetailModel | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAllOrderDetails();
    this.getAllItems();
  }

  getAllOrderDetails() {
    this.http.get<OrderDetailModel[]>("http://localhost:8080/order-detail/get-all").subscribe({
      next: (data) => {
        this.orderDetailList = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Failed to load order details:", err);
      }
    });
  }

  getAllItems() {
    this.http.get<ItemModel[]>("http://localhost:8080/item/get-all").subscribe(data => {
      this.itemList = data;
    });
  }

  getItemDescription(itemCode: string): string {
    const item = this.itemList.find(i => i.code === itemCode);
    return item ? item.description : itemCode;
  }

  getItemUnitPrice(itemCode: string): number {
    const item = this.itemList.find(i => i.code === itemCode);
    return item ? item.unitPrice : 0;
  }

  getLineTotal(detail: OrderDetailModel): number {
    const unitPrice = this.getItemUnitPrice(detail.itemCode);
    const total = unitPrice * detail.qty;
    const discountAmount = total * (detail.discount / 100);
    return total - discountAmount;
  }

  toggleAddForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  selectOrderDetail(detail: OrderDetailModel) {
    this.selectedOrderDetail = detail;
    this.orderDetailObj = { ...detail };
    this.showForm = true;
  }

  saveOrderDetail() {
    if (!this.orderDetailObj.orderId || !this.orderDetailObj.itemCode) {
      Swal.fire("Warning", "Please fill in Order ID and Item Code!", "warning");
      return;
    }

    if (this.selectedOrderDetail) {
      // Update
      this.http.put("http://localhost:8080/order-detail/update", this.orderDetailObj).subscribe({
        next: () => {
          Swal.fire("Success", "Order Detail Updated!", "success");
          this.getAllOrderDetails();
          this.showForm = false;
          this.resetForm();
        },
        error: (err) => {
          Swal.fire("Error", "Failed to update order detail.", "error");
          console.error(err);
        }
      });
    } else {
      // Create
      this.http.post("http://localhost:8080/order-detail/save", this.orderDetailObj).subscribe({
        next: () => {
          Swal.fire("Success", "Order Detail Saved!", "success");
          this.getAllOrderDetails();
          this.showForm = false;
          this.resetForm();
        },
        error: (err) => {
          Swal.fire("Error", "Failed to save order detail.", "error");
          console.error(err);
        }
      });
    }
  }

  deleteOrderDetail(detail: OrderDetailModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete detail for Order ${detail.orderId} - Item ${detail.itemCode}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/order-detail/delete/${detail.orderId}/${detail.itemCode}`).subscribe({
          next: () => {
            Swal.fire("Deleted!", "Order detail has been deleted.", "success");
            this.getAllOrderDetails();
          },
          error: (err) => {
            Swal.fire("Error", "Failed to delete order detail.", "error");
            console.error(err);
          }
        });
      }
    });
  }

  resetForm() {
    this.orderDetailObj = { orderId: '', itemCode: '', qty: 1, discount: 0 };
    this.selectedOrderDetail = null;
  }
}
