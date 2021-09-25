import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { paginatedOrderDto } from './dto/paginated-order.dto';
import { PaginationDto } from '../../common/pagination.dto';
import { orderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { createOrderDto } from './dto/create-order.dto';
import { Controller } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { updateOrderDto } from './dto/update-order.dto';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @MessagePattern({ cmd: 'create_order' })
  async createOrder(@Payload() input: createOrderDto): Promise<orderDto> {
    return await this.orderService.create(input);
  }

  @MessagePattern({ cmd: 'cancel_order' })
  async cancelOrderStatus(@Payload() id: string): Promise<orderDto> {
    return await this.orderService.cancel(id);
  }

  @MessagePattern({ cmd: 'get_all_orders' })
  async getAllOrderStatus(
    @Payload() paginationDto: PaginationDto,
  ): Promise<paginatedOrderDto> {
    return await this.orderService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'get_order' })
  async getOrderStatus(@Payload() id: string): Promise<orderDto> {
    return await this.orderService.getStatusById(id);
  }

  @EventPattern('successful_payment')
  async successfulPayment(@Payload() input: updateOrderDto): Promise<orderDto> {
    const successfulPayment = await this.orderService.successfulPayment(input);
    return successfulPayment;
  }

  @EventPattern('unsuccessful_payment')
  async unsuccessfulPayment(
    @Payload() input: updateOrderDto,
  ): Promise<orderDto> {
    return await this.orderService.unsuccessfulPayment(input);
  }

  @Cron('30 * * * * *')
  async updateConfirmed() {
    return await this.orderService.delivered();
  }
}
