import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { OneAddressResponseBody, ResponseBody } from './address.model';
import { GetAddressesBalanceDto } from './dto/getAddressBalance.dto';
import { GetAddressBalanceDto } from './dto/getAddressBalance.fto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('one/balance')
  @UsePipes(ValidationPipe)
  async getAddressBalance(
    @Body() getAddressBalanceDto: GetAddressBalanceDto,
  ): Promise<OneAddressResponseBody> {
    return await this.addressService.getAddressBalance(getAddressBalanceDto);
  }

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
