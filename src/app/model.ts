
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
  