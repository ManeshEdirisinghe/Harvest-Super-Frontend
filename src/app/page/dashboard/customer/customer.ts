import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerModel } from '../../../../model/type';

@Component({
  selector: 'app-customer',
  imports: [CommonModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
  customerList: Array<CustomerModel> = [];
  showForm = false;

  customerOject: CustomerModel = {
    id: 'String',
    title:'String',
    name: 'String',
    dob: {},
    salary: 0.0,
    address: 'String',
    city: "String",
    province: "String",
    postalCode: "String"
  };

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

  // addCustomer(title: string, custname: string, dob: string, salary: string, address: string, city: string, province: string, postalcode: string) {
  //   const customer = {
  //     title,
  //     custname,
  //     dob,
  //     salary: parseFloat(salary),
  //     address,
  //     city,
  //     province,
  //     postalcode
  //   };

  //   this.http.post("http://localhost:8080/customer/save", customer).subscribe({
  //     next: () => {
  //       this.getAll();
  //       this.showForm = false;
  //     }
  //   });
  // }

  addCustomer(): void {
    this.http.post("http://localhost:8080/customer/add-customer", this.customerOject).subscribe(data=>{
      if(data===true){

      }
      this.getAll();
    })
  }
}
