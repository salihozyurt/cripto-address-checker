import { IsArray, IsDefined } from 'class-validator';

export class GetAddressesBalanceDto {
  @IsDefined()
  @IsArray()
  addresses: string[];
}
