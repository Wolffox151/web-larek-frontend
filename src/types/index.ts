export interface IProduct {
  id: string;
  image: string;
  description: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IOrderPayment {
  payment?: string;
  address?: string;
  checkValidatePayment(inputs: Record<keyof TCartOrderUserPaymentAddress, string>): boolean;
}

export interface IOrderContacts {
  email?: string;
  phone?: string;
  checkValidateContacts(inputs: Record<keyof TCartOrderUserContacts, string>): boolean;
}

export interface IOrderData {
  items: IProduct[];
  addProduct(product: IProduct): void;
  removeProduct(product: IProduct): void;
  getCartData(): IProduct[] | null;
  getTotalPrice(orderItems: IProduct[]): number | null;
  getTotalLength(orderItems: IProduct[]): number | null;
  checkProductinCart(orderItems: IProduct[], product: IProduct): boolean;
}

export interface IProductData {
  items: IProduct[];
  preview: string | null;
  getProduct(productId: string): IProduct;
  getProductList(): IProduct[];
  getProductPreview(product: IProduct): string;
}

export type TProductBaseInfo = Pick<IProduct, 'title' | 'category' | 'image' | 'price'>;
export type TProductInfo = IProduct;

export type TCartOrderProducts = Pick<IOrderData, 'items'>;
export type TCartOrderUserPaymentAddress = Pick<IOrderPayment, 'payment' | 'address'>;
export type TCartOrderUserContacts = Pick<IOrderContacts, 'email' | 'phone'>;
export type TCartOrderSuccess = number;




