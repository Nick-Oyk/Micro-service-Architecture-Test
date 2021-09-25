import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaginationMiddleware } from './middlewares/pagination.middleware';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: 'order/status/all', method: RequestMethod.GET });
  }
}
