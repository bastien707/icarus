type Transaction = {
  hash: string;
  from: string;
  to: string;
  timeStamp: string;
  value: number;
  functionName: string;
};

interface Props {
  transactions: Transaction[];
}

export default async function Transaction({ transactions }: Props) {
  return (
    <div className="break-words">
      {transactions?.map(transaction => (
        <div className="border-t-2 border-stone-900" key={transaction.hash}>
          <p>Hash: {transaction.hash}</p>
          <p>From: {transaction.from}</p>
          <p>To: {transaction.to}</p>
          <p>Time Stamp: {transaction.timeStamp}</p>
          <p>Value: {transaction.value}</p>
          <p>Function Name: {transaction.functionName}</p>
        </div>
      ))}
    </div>
  );
}
