import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { ResponseBody } from './addresses.model';
import { GetAddressesBalanceDto } from './dto/getAddressBalance.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Post('balance')
  async getAddressesBalance(
    @Body() getAddressesBalanceDto: GetAddressesBalanceDto,
  ): Promise<ResponseBody> {
    return await this.addressesService.getAddressesBalance(
      getAddressesBalanceDto,
    );
  }
}
