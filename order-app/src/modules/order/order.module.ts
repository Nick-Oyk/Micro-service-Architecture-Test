import { OrderRepository } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
