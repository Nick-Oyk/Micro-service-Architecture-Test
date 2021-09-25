import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { createOrderDto } from './dto/create-order.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('order/create')
  async createOrder(@Body() input: createOrderDto) {
    return await this.appService.create(input);
  }

  @Patch('order/cancel/:id')
  async cancelOrderStatus(@Param() id: string) {
    return await this.appService.cancel(id);
  }

  @Get('order/status/all')
  async getAllOrderStatus(@Query() paginationDto: PaginationDto) {
    return await this.appService.findAllOrders(paginationDto);
  }

  @Get('order/status/:id')
  async getOrderStatus(@Param() id: string) {
    return await this.appService.getOrderStatusById(id);
  }

  @Get('payment/status/all')
  async getAllPaymentStatus() {
    return await this.appService.findAllPayments();
  }

  @Get('payment/status/:id')
  async getPaymentStatus(@Param() id: string) {
    return await this.appService.getPaymentStatusById(id);
  }
}
