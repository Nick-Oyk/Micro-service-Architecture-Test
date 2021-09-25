import { OrderModule } from './modules/order/order.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forRoot(), ScheduleModule.forRoot(), OrderModule],
})
export class AppModule {}
