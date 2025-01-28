
export interface SignUp{
    fullName:string,
    email:string,
    password:string,
    phone:string
}

export interface SignIn {

    email:string,
    password: string
}

 
export interface Product {
[x: string]: any;
description: any;
    id: number;
    name: string;
    categoryId: number;
    price: number;
    byteImage: string | null;
    catName: string;
  }

export interface Category{
   id:number,
   categoryName:string
}

export interface CustomerOrderDto{
    id:number, //customer id
    orderItems:{
        id:number, //item id
        itemName:string,
        quantity:number,
        pricePerItem: number,
        totalPrice:number
    },
    totalAmount: number  //total amount calculated from total item list by adding total price to total amount per each order item
}
  