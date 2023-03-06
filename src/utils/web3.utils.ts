import Web3 from 'web3';

export class Web3Utils {
  private static web3: Web3;

  static getWeb3(): Web3 {
    if (!this.web3) {
      this.web3 = new Web3(
        `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      );
    }

    return this.web3;
  }
}
