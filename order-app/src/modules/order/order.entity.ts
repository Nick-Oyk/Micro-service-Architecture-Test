import { OrderStatus } from 'src/common/order-status';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  itemName: string;

  @Column('decimal', { precision: 15, scale: 6 })
  unitPrice: number;

  @Column('decimal', { precision: 15, scale: 6 })
  quantity: number;

  @Column('decimal', { precision: 15, scale: 6 })
  totalAmount: number;

  @Column('decimal', { default: 0, precision: 15, scale: 6 })
  amountPaid: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.CREATED })
  orderStatus: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: string;
}
