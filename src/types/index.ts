export interface IProduct {
  id: string;
  description?: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IOrder {
  payment: string;
  email: string;
  phone: string;
  address: string;
}

export interface ICartData {
  total: number;
  items: IProduct['id'][];
}

export interface IProductData {
  total: number;
  items: IProduct[];
}

export interface ILarekApi {
  getProducts: () => Promise<IProduct[]>
  
}