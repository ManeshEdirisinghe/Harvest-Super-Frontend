import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerModel } from '../../../../model/type';

@Component({
  selector: 'app-customer',
  imports: [FormsModule, CommonModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
newCustomer: any;
addCustomer() {
throw new Error('Method not implemented.');
}

  customerList:Array<CustomerModel> = [];
showForm: any;

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.http.get<CustomerModel[]>("http://localhost:8080/customer/get-all").subscribe(data => {
      this.customerList = data;
    })
  }
}
