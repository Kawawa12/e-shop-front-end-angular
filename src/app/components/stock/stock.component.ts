import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { StockResponseDto } from '../../model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilterProductsModelComponent } from '../filter-products-model/filter-products-model.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['productName', 'stockQuantity', 'createdAt', 'updatedAt','actions'];
  dataSource = new MatTableDataSource<StockResponseDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  stockForm: FormGroup;
  productId!: number;

  constructor(private adminService: AdminService, private fb:FormBuilder,private dialog:MatDialog) {
    this.stockForm = this.fb.group({
      productName: ['', Validators.required],
      stockQuantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.getAllStocksProducts();
  }

  getAllStocksProducts() {
    this.adminService.getAllStockProducts().subscribe((res: StockResponseDto[]) => {
      // console.log("Stocks Products:", res);
      this.dataSource.data = res;  
    });
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateProduct(product: any) {
    console.log('Update product:', product);
     
  }
  
  activateProduct(product: any) {
    console.log('Activate product:', product);
     
  }
  
  deactivateProduct(product: any) {
    console.log('Deactivate product:', product);
    
  }

  openProductDialog() {
     
    const screenWidth = window.innerWidth;
    let dialogWidth = '80%';  
  
    if (screenWidth < 600) {  
      dialogWidth = '95%';
    } else if (screenWidth < 960) {  
      dialogWidth = '75%';
    }
  
    const dialogRef = this.dialog.open(FilterProductsModelComponent, {
      position: { top: "50px" },  
      width: dialogWidth,  
      maxWidth: '1200px', 
      height:'60%',
      data: this.dataSource.data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      const selectedProductdName = result.productName;
      this.productId = result.productId;
      if (selectedProductdName) {
        this.stockForm.patchValue({ productName: selectedProductdName });
      }
    });
  }
  
  addStock() {
    if (this.stockForm.invalid) {
      Swal.fire({
        title: 'Form Invalid',
        text: 'Please fill out all required fields correctly.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const stockValue = this.stockForm.get('stockQuantity')?.value;
    const productName = this.stockForm.get('productName')?.value || 'Unknown Product';
  
    if (!this.productId) {
      Swal.fire({
        title: 'Error!',
        text: 'Product ID is missing. Please select a product.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    // Show loading indicator
    Swal.fire({
      title: 'Adding Stock...',
      text: 'Please wait while we process your request.',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    this.adminService.addStock(stockValue, this.productId).subscribe({
      next: (res) => {
        Swal.close(); // Close the loading indicator
        Swal.fire({
          title: 'Stock Added!',
          text: res.message || `${stockValue} stock added successfully to ${productName}.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.stockForm.reset();
      },
      error: (err) => {
        Swal.close(); // Close the loading indicator
        Swal.fire({
          title: 'Error!',
          text: err.error?.error || 'Failed to add stock. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }
  
}