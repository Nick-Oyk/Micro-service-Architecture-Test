import { OrderEntity } from './order.entity';
import { ClientProxy } from '@nestjs/microservices';
import { paginatedOrderDto } from './dto/paginated-order.dto';
import { PaginationDto } from '../../common/pagination.dto';
import { createOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { orderDto } from './dto/order.dto';
import { OrderStatus } from 'src/common/order-status';
import { v4 as uuidv4 } from 'uuid';
import { updateOrderDto } from './dto/update-order.dto';
import { getConnection } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @Inject('PAYMENT_SERVICE') private client: ClientProxy,
  ) {}

  async create(input: createOrderDto): Promise<orderDto> {
    try {
      //mock userId using uuid npm package
      const userId = uuidv4();
      const totalAmount = input.unitPrice * input.quantity;
      const product = this.orderRepository.create({
        ...input,
        userId,
        totalAmount,
      });
      const savedProduct = await this.orderRepository.save(product);

      this.client.emit('create_payment', {
        orderId: savedProduct.id,
        userId,
        totalAmount,
      });
      return savedProduct;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async cancel(id: string): Promise<orderDto> {
    try {
      const orderToUpdate = await this.orderRepository.findOne(id);
      orderToUpdate.orderStatus = OrderStatus.CANCELLED;
      return await this.orderRepository.save(orderToUpdate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delivered() {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(OrderEntity)
        .set({ orderStatus: OrderStatus.DELIVERED })
        .where('orderStatus = :orderStatus', {
          orderStatus: OrderStatus.CONFIRMED,
        })
        .execute();
      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<paginatedOrderDto> {
    try {
      const { take, skip } = paginationDto;
      const [data, totalCount] = await this.orderRepository.findAndCount({
        take,
        skip,
      });
      return { data, take, skip, totalCount };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getStatusById(id: string): Promise<orderDto> {
    try {
      return await this.orderRepository.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async successfulPayment(input: updateOrderDto): Promise<orderDto> {
    try {
      const orderToUpdate = await this.orderRepository.findOne(input.id);
      orderToUpdate.orderStatus = OrderStatus.CONFIRMED;
      orderToUpdate.amountPaid = input.amountPaid;
      return await this.orderRepository.save(orderToUpdate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async unsuccessfulPayment(input: updateOrderDto): Promise<orderDto> {
    try {
      const orderToUpdate = await this.orderRepository.findOne(input.id);
      orderToUpdate.orderStatus = OrderStatus.CANCELLED;
      return await this.orderRepository.save(orderToUpdate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
