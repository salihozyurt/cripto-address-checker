import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { ResponseBody } from './address.model';
import { GetAddressesBalanceDto } from './dto/getAddressBalance.dto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post('balance')
  @UsePipes(ValidationPipe)
  async getAddressesBalance(
    @Body() getAddressesBalanceDto: GetAddressesBalanceDto,
  ): Promise<ResponseBody> {
    return await this.addressService.getAddressesBalance(
      getAddressesBalanceDto,
    );
  }
}
