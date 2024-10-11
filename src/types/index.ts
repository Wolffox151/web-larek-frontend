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
  addProduct(product: IProduct['id']): void;
}

export interface IProductData {
  total: number;
  items: IProduct[];
}

export type TProductBaseInfo = Pick<IProduct, 'title' | 'category' | 'image' | 'price'>
export type TProductInfo = Pick<IProduct, 'title'  | 'description' | 'category' | 'image' | 'price'>

