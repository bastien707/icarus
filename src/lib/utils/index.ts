import { math, regex } from '../constants';

export const isValidEthAddress = (address: string) => {
  return regex.ETH.test(address);
};

export const toEth = (amount: number) => {
  return amount / math.POW18;
};
