import { Product } from '@frontend/products';
import { User } from '@frontend/users';

export class Order {
  user?: any;
  orderItems?: [{ product: Product; quantity: number }];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: string;
  dateOrdered?: string;
  totalPrice?: number;
}
