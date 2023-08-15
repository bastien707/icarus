const ethRegex = /^0x[a-fA-F0-9]{40}$/;

export const isValidEthAddress = (address: string) => {
  return ethRegex.test(address);
};
