import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetAddressBalanceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  address: string;
}
