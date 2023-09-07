import { Transaction } from '@/app/types/Transaction';
import { offset, regex } from '../../constants';
import { timeStampToDateTime, toEth } from '..';

export function generateTransactionApiUrl(ethAddress: string, page: number, selected: string) {
  const baseUrl = process.env.ETHERSCAN_BASE_URL;
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const module = 'account';
  const action = selected === 'Normal' ? 'txlist' : 'txlistinternal';

  const queryParameters: URLSearchParams = new URLSearchParams({
    module,
    action: action,
    address: ethAddress,
    startblock: '0',
    endblock: '99999999',
    page: page.toString(),
    offset: offset.TRANSACTIONS.toString(),
    sort: 'desc',
    apikey: apiKey || '',
  });

  return `${baseUrl}?${queryParameters.toString()}`;
}

export function createCustomTransaction(data: any): Transaction[] {
  return data.result.map((transaction: Transaction) => {
    const totalGasCostEther = toEth(transaction.gasUsed * parseInt(transaction.gasPrice, 10));
    let functionName: RegExpExecArray | null = null;
    if (typeof transaction.functionName === 'string') {
      functionName = regex.FIRSTWORD.exec(transaction.functionName);
    }
    const dateTime = timeStampToDateTime(transaction.timeStamp);

    const tx: Transaction = {
      hash: transaction.hash,
      value: toEth(transaction.value),
      timeStamp: transaction.timeStamp,
      from: transaction.from,
      to: transaction.to,
      functionName,
      gasUsed: transaction.gasUsed,
      gasPrice: transaction.gasPrice,
      totalGasCostEther,
      dateTime,
    };

    return tx;
  });
}
