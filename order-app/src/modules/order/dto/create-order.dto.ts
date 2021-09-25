import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class createOrderDto {
  @IsNotEmpty()
  @IsString()
  itemName: string;

  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
