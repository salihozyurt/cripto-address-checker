import { Injectable } from '@nestjs/common';
import {
  OneAddressResponseBody,
  ResponseBody,
  SortedAddress,
} from './address.model';
import { GetAddressesBalanceDto } from './dto/getAddressBalance.dto';
import { ExchangeUtils } from '../utils/exchange.utils';
import { Web3Utils } from '../utils/web3.utils';
import { GetAddressBalanceDto } from './dto/getAddressBalance.fto';

@Injectable()
export class AddressService {
  async getAddressBalance(
    getAddressBalanceDto: GetAddressBalanceDto,
  ): Promise<OneAddressResponseBody> {
    const { address } = getAddressBalanceDto;

    const web3 = Web3Utils.getWeb3();

    const valid = web3.utils.isAddress(address);

    if (!valid) {
      return { valid };
    }

    const balance = Number(
      web3.utils.fromWei(await web3.eth.getBalance(address)),
    );

    const usdExchangeRate: number = await ExchangeUtils.getUsdExchangeRate();

    const sortedAddress: SortedAddress = {
      address,
      eth_balance: balance,
      usd_balance: balance * usdExchangeRate,
    };

    return { valid, address_information: sortedAddress };
  }

  async getAddressesBalance(
    getAddressesBalanceDto: GetAddressesBalanceDto,
  ): Promise<ResponseBody> {
    const { addresses } = getAddressesBalanceDto;
    const wrongAddresses = [];
    const validAddresses = [];
    const sortedAddresses: SortedAddress[] = [];

    const web3 = Web3Utils.getWeb3();

    addresses.forEach((address) => {
      web3.utils.isAddress(address) === true
        ? validAddresses.push(address)
        : wrongAddresses.push(address);
    });

    const usdExchangeRate: number = await ExchangeUtils.getUsdExchangeRate();

    for (const address of validAddresses) {
      const balance = Number(
        web3.utils.fromWei(await web3.eth.getBalance(address)),
      );

      const sortedAddress: SortedAddress = {
        address,
        eth_balance: balance,
        usd_balance: balance * usdExchangeRate,
      };

      sortedAddresses.push(sortedAddress);
    }

    sortedAddresses.sort((a, b) => b.usd_balance - a.usd_balance);

    const responseBody: ResponseBody = {
      wrong_addresses: wrongAddresses,
      sorted_addresses: sortedAddresses,
    };

    return responseBody;
  }
}
