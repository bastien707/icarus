import Transaction from '@/components/Transaction';

export default async function Tokens() {
  const getTransactions = async () => {
    const res = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${process.env.UOS_CONTRACT_ADDRESS}&address=${process.env.ADDRESS2}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return await res.json();
  };

  const data = await getTransactions();

  return (
    <main>
      <h1 className="text-2xl">Tokens</h1>
      <Transaction transactions={data.result} />
    </main>
  );
}
