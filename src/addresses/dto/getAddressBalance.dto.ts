import { IsDefined } from 'class-validator';

export class GetAddressesBalanceDto {
  @IsDefined()
  addresses: string[];
}
