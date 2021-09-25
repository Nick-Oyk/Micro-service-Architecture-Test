import { PaymentModule } from './modules/payment/payment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/payment-app'),
    PaymentModule,
  ],
})
export class AppModule {}
