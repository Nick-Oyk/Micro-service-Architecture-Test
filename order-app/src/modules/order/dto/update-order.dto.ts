import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class updateOrderDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  amountPaid: number;
}
