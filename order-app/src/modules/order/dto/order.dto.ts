import { OrderStatus } from 'src/common/order-status';

export class orderDto {
  id: string;

  itemName: string;

  unitPrice: number;

  quantity: number;

  totalAmount: number;

  amountPaid: number;

  orderStatus: OrderStatus;

  createdAt: Date;

  updatedAt: Date;

  userId: string;
}
