import { tokenwithBalance } from "@/app/api/hooks/useTokens";

export function TokenDetails({ tokens }: { tokens: tokenwithBalance[] }) {
  return (
    <div className="space-y-4 mt-4">
      {tokens.map((token) => (
        <TokenInfo key={token.name} token={token} />
      ))}
    </div>
  );
}

export function TokenInfo({ token }: { token: tokenwithBalance }) {
  return (
    <div className="flex items-center bg-gray-600 p-4 rounded-lg shadow-md">
      <image
        href={token.image}
        width={40}
        height={40}
        className="rounded-full mr-4"
      />
      <div className="text-white">
        <p className="font-semibold text-lg">{token.name}</p>
        <p className="text-sm text-gray-300">
          USDC Balance: {token.usdBalance}
        </p>
        <p className="text-sm text-gray-300">Balance: {token.balance}</p>
      </div>
    </div>
  );
}
