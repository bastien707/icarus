export default async function Page() {

  type Transaction = {
    hash: string;
    from: string;
    to: string;
    timeStamp: string;
    value: number;
    functionName: string;
  };

  const getTransactions = async () => {
    const res = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${process.env.ADDRESS}&startblock=0&endblock=99999999&page=10&offset=0&sort=asc&apikey${process.env.ETHERSCAN_API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }
    return await res.json();
  };

  const data = await getTransactions();

  return (
    <main>
      <h1>Transactions</h1>
      <ol>
        {data.result.map((transaction: Transaction) => (
          <li key={transaction.hash}>
            <h1>{transaction.hash}</h1>
            <p>from: {transaction.from}</p>
            <p>to: {transaction.to}</p>
            <p>timestamp: {transaction.timeStamp}</p>
            <p>value: {transaction.value / 1000000000000000000}ETH</p>
            <p>functionName:{transaction?.functionName}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
