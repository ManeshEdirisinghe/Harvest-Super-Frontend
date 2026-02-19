import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // ChangeDetectorRef add kala
import { FormsModule } from '@angular/forms';
import { CustomerModel } from '../../../../model/type';

@Component({
  selector: 'app-customer',
  imports: [FormsModule, CommonModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
  newCustomer: any;
  customerList: Array<CustomerModel> = [];
  showForm: any;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.http.get<CustomerModel[]>("http://localhost:8080/customer/get-all").subscribe({
      next: (data) => {
        this.customerList = data;
        this.cdr.detectChanges();
      }
    });
  }

  addCustomer() {
    throw new Error('Method not implemented.');
  }
}
