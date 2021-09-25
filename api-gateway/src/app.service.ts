import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { createOrderDto } from './dto/create-order.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('ORDER_SERVICE') private orderClient: ClientProxy,
    @Inject('PAYMENT_SERVICE') private paymentClient: ClientProxy,
  ) {}

  async create(input: createOrderDto) {
    try {
      const order = this.orderClient.send<createOrderDto>(
        { cmd: 'create_order' },
        input,
      );
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async cancel(id: string) {
    try {
      const order = this.orderClient.send<string>({ cmd: 'cancel_order' }, id);
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllOrders(input: PaginationDto) {
    try {
      const orders = this.orderClient.send<PaginationDto>(
        { cmd: 'get_all_orders' },
        input,
      );
      return orders;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOrderStatusById(id: string) {
    try {
      const orders = this.orderClient.send<string>({ cmd: 'get_order' }, id);
      return orders;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllPayments() {
    try {
      const orders = this.paymentClient.send(
        {
          cmd: 'get_all_payments',
        },
        {},
      );
      return orders;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPaymentStatusById(id: string) {
    try {
      const orders = this.paymentClient.send<string>(
        { cmd: 'get_payment' },
        id,
      );
      return orders;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
