import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined } from 'class-validator';

export class GetAddressesBalanceDto {
  @IsDefined()
  @IsArray()
  @ApiProperty({ type: [String] })
  addresses: string[];
}
