
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
    id: number;
    name: string;
    categoryId: number;
    price: number;
    byteImage: string | null;
    catName: string;
  }
  