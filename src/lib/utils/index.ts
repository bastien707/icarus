import { math, regex, wallet_address, wallet_name } from '../constants';

export const isValidEthAddress = (address: string) => {
  return regex.ETH.test(address);
};

export const toEth = (amount: number) => {
  return amount / math.POW18;
};

export const timeStampToDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

export const timeStampToDateTime = (timestamp: number) => {
  const date = timeStampToDate(timestamp);
  const time = new Date(timestamp * 1000).toLocaleTimeString();

  if (date === 'Invalid Date' || time === 'Invalid Date') {
    return 'Invalid Date';
  }

  return `${date} ${time}`;
};

export const isKnownWallet = (address: string) => {
  address = address.toLowerCase();
  for (const key in wallet_address) {
    const known = wallet_address[key as keyof typeof wallet_address].toLowerCase();
    if (known === address) {
      return wallet_name[key as keyof typeof wallet_name];
    }
  }
  return address;
};
