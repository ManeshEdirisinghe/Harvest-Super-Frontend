import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerModel } from '../../../../model/type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
  customerList: Array<CustomerModel> = [];
  showForm = false;

  customerObj: CustomerModel = {
    id: '',
    title: '',
    name: '',
    dob: {},
    salary: 0,
    address: '',
    city: '',
    province: '',
    postalCode: ''
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

  toggleAddForm() {
    this.showForm = !this.showForm;
  }

addCustomer(): void {
    console.log(this.customerObj);
    this.http.post("http://localhost:8080/customer/add-customer", this.customerObj).subscribe(data => {
      console.log(data);
      if (data === true) {
        Swal.fire({
          title: "Good job! "+this.customerObj.name+" Added Successfully!!",
          text: "You clicked the button!",
          icon: "success"
        });
      }
      this.getAll();
    })
  }
}
