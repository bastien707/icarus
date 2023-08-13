import { Transaction } from "@/components/Transaction";

export default async function transaction() {

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
      <h1 className="text-2xl">Transactions</h1>
      <Transaction transactions={data.result} />
    </main>
  );
}