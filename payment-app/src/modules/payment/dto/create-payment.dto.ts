import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class createPaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;
}
