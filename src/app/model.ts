export interface SignUp {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface Product {
  [x: string]: any;
  desc: string;
  id: number;
  stock: number;
  name: string;
  categoryId: number;
  price: number;
  byteImage: string | null;
  catName: string;
}

export interface Category {
  id: number;
  categoryName: string;
}


export interface CustomerOrderDto {
    id?: number; // Customer ID (to be implemented later)
    orderItems: {
      id: number; // Item ID
      itemName: string;
      quantity: number;
      price: number;
      totalPrice: number;
    }[];
    totalAmount: number; // Total amount calculated from total item list
  }

  export interface CustomerOrderRespDto {
    id: number;
    userId: number;
      customerName: string;
      orderStatus: string,
      orderDate: Date,
      cartItems: {
          id: number,
          itemName: string,
          quantity: number,
          pricePerProduct: number,
          totalPrice:number,
      }[],
      totalAmount:number
  }

export interface StockResponseDto{
  id?:number,
  productName: string,
  stockQuantity: number,
  dateCreated: Date,
  dateUpdated: Date,
  }
  