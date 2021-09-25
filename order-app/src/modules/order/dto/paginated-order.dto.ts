import { OrderEntity } from './../order.entity';

export class paginatedOrderDto {
  data: OrderEntity[];
  take: number;
  skip: number;
  totalCount: number;
}
