export interface IProduct {
  id: string;
  description?: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IOrderPayment {
  payment?: string;
  address?: string;
  checkValidatePayment(inputs: Record<keyof TCartOrderUserPaymentAdress, string>):boolean;
}

export interface IOrderContacts {
  email?: string;
  phone?: string;
  checkValidateContacts(inputs: Record<keyof TCartOrderUserContacts, string>): boolean;
}

export interface IOrderData {
  total: number;
  items: IProduct[];
  addProduct(product: string): IProduct;
  removeProduct(product: IProduct['id']): void;
  getCartData(): IProduct[] | null;
}

export interface IProductData {
  items: IProduct[];
  preview: string | null;
  getProduct(productId: string): IProduct;
  getProductList(): IProduct[];
  getProductPreview(productId: string): TProductInfo;
}

export type TProductBaseInfo = Pick<IProduct, 'title' | 'category' | 'image' | 'price'>;
export type TProductInfo = Pick<IProduct, 'title'  | 'description' | 'category' | 'image' | 'price'>;

export type TCartOrderProducts = Pick<IOrderData, 'total' | 'items'>;
export type TCartOrderUserPaymentAdress = Pick<IOrderPayment, 'payment' | 'address'>;
export type TCartOrderUserContacts = Pick<IOrderContacts, 'email' | 'phone'>;
export type TCartOrderSuccess = Pick<IOrderData, 'total'>;




