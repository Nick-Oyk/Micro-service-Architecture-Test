import { createPaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';
import { Controller } from '@nestjs/common';
import { Payment } from './payment.entity';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @MessagePattern({ cmd: 'get_all_payments' })
  async get(): Promise<Payment[]> {
    return await this.paymentService.findAll();
  }

  @MessagePattern({ cmd: 'get_payment' })
  async getOrderStatus(@Payload() id: string): Promise<Payment> {
    return await this.paymentService.getStatusById(id);
  }

  @EventPattern('create_payment')
  async createPayment(@Payload() input: createPaymentDto): Promise<Payment> {
    return await this.paymentService.create(input);
  }
}
