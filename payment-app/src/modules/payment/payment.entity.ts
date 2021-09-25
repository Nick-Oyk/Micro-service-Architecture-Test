import { PaymentStatus } from './../../common/payment-status';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop()
  orderId: string;

  @Prop()
  userId: string;

  @Prop()
  totalAmount: number;

  @Prop({ default: 0 })
  amountPaid: number;

  @Prop({ enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
