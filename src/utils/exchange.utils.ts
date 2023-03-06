import axios from 'axios';

export const getUsdExchangeRate = async (): Promise<number> => {
  const { data } = await axios.get(process.env.USD_EXCHANGE_RATE_ENDPOINT);
  const usdExchangeRate = data.ethereum.usd;

  return usdExchangeRate;
};
