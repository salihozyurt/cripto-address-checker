import { Injectable } from '@nestjs/common';
import { ResponseBody, SortedAddress } from './addresses.model';
import { GetAddressesBalanceDto } from './dto/getAddressBalance.dto';
import { getUsdExchangeRate } from 'src/utils/exchange.utils';
import { Web3Utils } from 'src/utils/web3.utils';

@Injectable()
export class AddressesService {
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

    const usdExchangeRate: number = await getUsdExchangeRate();

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
