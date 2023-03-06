export interface ResponseBody {
  wrong_addresses: string[];
  sorted_addresses: SortedAddress[];
}

export interface SortedAddress {
  address: string;
  eth_balance: number;
  usd_balance: number;
}
