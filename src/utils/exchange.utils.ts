import { Logger } from '@nestjs/common';
import axios from 'axios';

export class ExchangeUtils {
  private static logger = new Logger('ExchangeUtils');

  static async getUsdExchangeRate(): Promise<number> {
    const { data } = await axios
      .get(process.env.USD_EXCHANGE_RATE_ENDPOINT)
      .catch((error) => {
        this.logger.error(
          `Error was occurred when getting eth-usd exchange rate ${error}`,
        );

        throw error;
      });

    return data.ethereum.usd;
  }
}
