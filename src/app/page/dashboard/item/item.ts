import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

export interface ItemModel {
  code: string;
  description: string;
  packSize: string;
  unitPrice: number;
  qtyOnHand: number;
}

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit {
  itemList: Array<ItemModel> = [];
  showForm = false;

  itemObj: ItemModel = {
    code: '',
    description: '',
    packSize: '',
    unitPrice: 0,
    qtyOnHand: 0
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems() {
    this.http.get<ItemModel[]>("http://localhost:8080/item/get-all").subscribe({
      next: (data) => {
        this.itemList = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error fetching items:", err);
      }
    });
  }

  toggleAddForm() {
    this.showForm = !this.showForm;
  }

  addItem(): void {
    console.log("Sending Item:", this.itemObj);

    this.http.post("http://localhost:8080/item/add-item", this.itemObj).subscribe({
      next: (data) => {
        console.log("Response:", data);

        if (data === true) {
          Swal.fire({
            title: "Success!",
            text: `Item ${this.itemObj.code} - ${this.itemObj.description} Added Successfully!!`,
            icon: "success"
          });

          this.getAllItems();
          this.showForm = false;
        }
      }

    });
  }


}
