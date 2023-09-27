export interface Transaction {
  hash: string;
  value: number;
  gasUsed: number;
  gasPrice: string;
  timeStamp: number;
  from: string;
  to: string;
  functionName?: null | RegExpExecArray | string;
  totalGasCostEther: number;
  dateTime: string;
}
