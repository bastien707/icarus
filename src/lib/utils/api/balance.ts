export function generateBalanceApiUrl(ethAddress: string) {
  const baseUrl = process.env.ETHERSCAN_BASE_URL;
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const module = 'account';
  const action = 'balance';

  const queryParameters: URLSearchParams = new URLSearchParams({
    module,
    action: action,
    address: ethAddress,
    tag: 'latest',
    apikey: apiKey || '',
  });

  return `${baseUrl}?${queryParameters.toString()}`;
}
