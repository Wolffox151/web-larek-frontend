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
  checkValidationPayment(data: Record<keyof TCartOrderUserPaymentAdress, string>):boolean;
  checkValidationContacts(data: Record<keyof TCartOrderUserContacts, string>):boolean;
}

export interface ICartData {
  total: number;
  items: IProduct['id'][];
  addProduct(product: IProduct['id']): void;
  removeProduct(product: IProduct['id']): void;

}

export interface IProductData {
  total: number;
  items: IProduct[];
  preview: string | null;
  getProduct(productId: string): IProduct;
}

export type TProductBaseInfo = Pick<IProduct, 'title' | 'category' | 'image' | 'price'>;
export type TProductInfo = Pick<IProduct, 'title'  | 'description' | 'category' | 'image' | 'price'>;

export type TCartOrderProducts = Pick<ICartData, 'total' | 'items'>;
export type TCartOrderUserPaymentAdress = Pick<IOrder, 'payment' | 'address'>;
export type TCartOrderUserContacts = Pick<IOrder, 'email' | 'phone'>;
export type TCartOrderSuccess = Pick<ICartData, 'total'>;




