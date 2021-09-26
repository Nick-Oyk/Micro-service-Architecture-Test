import { createPaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Payment, PaymentDocument } from './payment.entity';
import { Model } from 'mongoose';
import { PaymentStatus } from '../../common/payment-status';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @Inject('ORDER_SERVICE') private client: ClientProxy,
  ) {}

  async findAll(): Promise<Payment[]> {
    try {
      return await this.paymentModel.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getStatusById(id: string): Promise<Payment> {
    try {
      return await this.paymentModel.findOne({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(input: createPaymentDto): Promise<Payment> {
    try {
      const createdPayment = new this.paymentModel(input);
      await createdPayment.save();
      const paymentResponse = await this.mockedPaymentLogic(createdPayment);
      return paymentResponse;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async mockedPaymentLogic(input: Payment): Promise<Payment> {
    const randomResponse = Math.random() < 0.5;
    if (randomResponse) {
      const updatedPayment = await this.paymentModel.findByIdAndUpdate(input, {
        paymentStatus: PaymentStatus.CONFIRMED,
        amountPaid: input.totalAmount,
      });
      this.client.emit('successful_payment', {
        id: input.orderId,
        amountPaid: input.totalAmount,
      });
      return updatedPayment;
    } else {
      const updatedPayment = await this.paymentModel.findByIdAndUpdate(input, {
        paymentStatus: PaymentStatus.DECLINED,
      });
      this.client.emit('unsuccessful_payment', {
        id: input.orderId,
        amountPaid: input.totalAmount,
      });
      return updatedPayment;
    }
  }
}
