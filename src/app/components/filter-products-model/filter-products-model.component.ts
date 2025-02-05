import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StockResponseDto } from '../../model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-products-model',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './filter-products-model.component.html',
  styleUrls: ['./filter-products-model.component.css']
})
export class FilterProductsModelComponent {
  filteredProducts: StockResponseDto[] = [];
  searchQuery: string = '';

  constructor(
    public dialogRef: MatDialogRef<FilterProductsModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StockResponseDto[]
  ) {
    this.filteredProducts = data;
  }

  filterProducts() {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = this.data;
    } else {
      this.filteredProducts = this.data.filter(product =>
        product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  selectProduct(product: StockResponseDto) {
    this.dialogRef.close({productName:product.productName, productId:product.id});
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
