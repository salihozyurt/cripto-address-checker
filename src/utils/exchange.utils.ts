import axios from 'axios';

export class ExchangeUtils {
  static async getUsdExchangeRate(): Promise<number> {
    const { data } = await axios.get(process.env.USD_EXCHANGE_RATE_ENDPOINT);

    return data.ethereum.usd;
  }
}
