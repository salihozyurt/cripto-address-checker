import { IsNotEmpty, IsString } from 'class-validator';

export class GetAddressBalanceDto {
  @IsNotEmpty()
  @IsString()
  address: string;
}
