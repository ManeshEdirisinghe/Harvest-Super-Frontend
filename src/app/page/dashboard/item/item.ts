import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-item',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {
  showForm = false;

  newItem = {
    name: '',
    category: '',
    price: 0,
    qty: 0,
  };

  items: { name: string; category: string; price: number; qty: number }[] = [];

  addItem() {
    if (this.newItem.name && this.newItem.category && this.newItem.price > 0) {
      this.items.push({ ...this.newItem });
      this.newItem = { name: '', category: '', price: 0, qty: 0 };
      this.showForm = false;
    }
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }
}
