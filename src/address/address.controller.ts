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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('one/balance')
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UsePipes(ValidationPipe)
  async getAddressBalance(
    @Body() getAddressBalanceDto: GetAddressBalanceDto,
  ): Promise<OneAddressResponseBody> {
    return await this.addressService.getAddressBalance(getAddressBalanceDto);
  }

  @Post('balance')
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UsePipes(ValidationPipe)
  async getAddressesBalance(
    @Body() getAddressesBalanceDto: GetAddressesBalanceDto,
  ): Promise<ResponseBody> {
    return await this.addressService.getAddressesBalance(
      getAddressesBalanceDto,
    );
  }
}
