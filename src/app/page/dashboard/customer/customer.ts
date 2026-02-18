import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  imports: [FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
  showForm = false;

  newCustomer = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };

  customers: { name: string; email: string; phone: string; address: string }[] = [];

  addCustomer() {
    if (this.newCustomer.name && this.newCustomer.email && this.newCustomer.phone) {
      this.customers.push({ ...this.newCustomer });
      this.newCustomer = { name: '', email: '', phone: '', address: '' };
      this.showForm = false;
    }
  }

  deleteCustomer(index: number) {
    this.customers.splice(index, 1);
  }
}
