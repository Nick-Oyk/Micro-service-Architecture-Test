import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderStatus } from './dto/order-status';

describe('AppController', () => {
  let controller: AppController;

  const mockAppService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        userId: Date.now(),
        totalAmount: 10,
        amountPaid: 0,
        orderStatus: OrderStatus.CREATED,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...dto,
      };
    }),
    cancel: jest.fn((id) => {
      return {
        id: id,
        userId: Date.now(),
        totalAmount: 10,
        amountPaid: 0,
        orderStatus: OrderStatus.CANCELLED,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        itemName: 'Chocolate',
        unitPrice: 2,
        quantity: 5,
      };
    }),
    findAllOrders: jest.fn((dto) => {
      return {
        data: [
          {
            id: '1',
            userId: Date.now(),
            totalAmount: 10,
            amountPaid: 0,
            orderStatus: OrderStatus.CANCELLED,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            itemName: 'Chocolate',
            unitPrice: 2,
            quantity: 5,
          },
        ],
        totalCount: 1,
        ...dto,
      };
    }),
    getOrderStatusById: jest.fn((id) => {
      return {
        id: id,
        userId: Date.now(),
        totalAmount: 10,
        amountPaid: 0,
        orderStatus: OrderStatus.CANCELLED,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        itemName: 'Chocolate',
        unitPrice: 2,
        quantity: 5,
      };
    }),
    findAllPayments: jest.fn(() => {
      return [
        {
          id: Date.now(),
          orderId: '1',
          userId: '1',
          totalAmount: 10,
          amountPaid: 0,
          paymentStatus: 'DECLINED',
        },
      ];
    }),
    getPaymentStatusById: jest.fn(() => {
      return {
        id: '1',
        orderId: Date.now(),
        userId: Date.now(),
        totalAmount: 10,
        amountPaid: 0,
        paymentStatus: 'DECLINED',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(mockAppService)
      .compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    expect(
      await controller.createOrder({
        itemName: 'Chocolate',
        unitPrice: 2,
        quantity: 5,
      }),
    ).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      totalAmount: 10,
      amountPaid: 0,
      orderStatus: OrderStatus.CREATED,
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
      itemName: 'Chocolate',
      unitPrice: 2,
      quantity: 5,
    });
    expect(mockAppService.create).toHaveBeenCalledWith({
      itemName: 'Chocolate',
      unitPrice: 2,
      quantity: 5,
    });
  });

  it('should update order status to cancel', async () => {
    expect(await controller.cancelOrderStatus('1')).toEqual({
      id: '1',
      userId: expect.any(Number),
      totalAmount: 10,
      amountPaid: 0,
      orderStatus: OrderStatus.CANCELLED,
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
      itemName: 'Chocolate',
      unitPrice: 2,
      quantity: 5,
    });
    expect(mockAppService.cancel).toHaveBeenCalled();
  });

  it('should get all order status', async () => {
    expect(
      await controller.getAllOrderStatus({
        take: 1,
        skip: 0,
      }),
    ).toEqual({
      data: [
        {
          id: '1',
          userId: expect.any(Number),
          totalAmount: 10,
          amountPaid: 0,
          orderStatus: OrderStatus.CANCELLED,
          createdAt: expect.any(Number),
          updatedAt: expect.any(Number),
          itemName: 'Chocolate',
          unitPrice: 2,
          quantity: 5,
        },
      ],
      take: 1,
      skip: 0,
      totalCount: 1,
    });
    expect(mockAppService.findAllOrders).toHaveBeenCalled();
  });

  it('should get an order status', async () => {
    expect(await controller.getOrderStatus('1')).toEqual({
      id: '1',
      userId: expect.any(Number),
      totalAmount: 10,
      amountPaid: 0,
      orderStatus: OrderStatus.CANCELLED,
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
      itemName: 'Chocolate',
      unitPrice: 2,
      quantity: 5,
    });
    expect(mockAppService.getOrderStatusById).toHaveBeenCalled();
  });

  it('should get all payment status', async () => {
    expect(await controller.getAllPaymentStatus()).toEqual([
      {
        id: expect.any(Number),
        orderId: '1',
        userId: '1',
        totalAmount: 10,
        amountPaid: 0,
        paymentStatus: 'DECLINED',
      },
    ]);
    expect(mockAppService.findAllPayments).toHaveBeenCalled();
  });

  it('should get a payment status', async () => {
    expect(await controller.getPaymentStatus('1')).toEqual({
      id: '1',
      orderId: expect.any(Number),
      userId: expect.any(Number),
      totalAmount: 10,
      amountPaid: 0,
      paymentStatus: 'DECLINED',
    });
    expect(mockAppService.getPaymentStatusById).toHaveBeenCalled();
  });
});
