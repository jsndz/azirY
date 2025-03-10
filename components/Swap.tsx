import { ReactNode, useState } from "react";
import { SUPPORTED_TOKENS, tokenDetails } from "../lib/tokens";
import { tokenwithBalance } from "@/app/api/hooks/useTokens";

export const Swap = ({
  tokenBalance,
  loading,
}: {
  loading: boolean;
  tokenBalance: {
    totalBalance: number;
    tokens: tokenwithBalance[];
  } | null;
}) => {
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
  const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1]);
  return (
    <div>
      <SwapInputRow
        selectedToken={baseAsset}
        title="FOR"
        onSelect={(asset) => {
          setBaseAsset(asset);
        }}
        subtitle={
          <div>
            {`${
              tokenBalance?.tokens.find((x) => x.name === baseAsset.name)
                ?.balance
            } ${baseAsset.name}`}
          </div>
        }
      ></SwapInputRow>
      <div className="flex justify-center">
        <div
          onClick={() => {
            let baseAssetTemp = baseAsset;
            setBaseAsset(quoteAsset);
            setQuoteAsset(baseAssetTemp);
          }}
          className="cursor-pointer rounded-full w-10 h-10 border absolute mt-[-20px] bg-white flex justify-center pt-2"
        >
          <SwapIcon />
        </div>
      </div>
      <SwapInputRow
        selectedToken={quoteAsset}
        title="GET"
        onSelect={(asset) => {
          setQuoteAsset(asset);
        }}
        subtitle={
          <div>
            {`${
              tokenBalance?.tokens.find((x) => x.name === quoteAsset.name)
                ?.balance
            } ${quoteAsset.name}`}
          </div>
        }
      ></SwapInputRow>
    </div>
  );
};

export const SwapInputRow = ({
  onSelect,
  selectedToken,
  title,
  subtitle,
}: {
  onSelect: (asset: tokenDetails) => void;
  selectedToken: tokenDetails;
  title: string;
  subtitle: ReactNode;
}) => {
  return (
    <div>
      <p>{title}</p>
      <p>{subtitle}</p>
      <AssetSelector
        selectedToken={selectedToken}
        onSelect={onSelect}
      ></AssetSelector>
    </div>
  );
};

export const AssetSelector = ({
  selectedToken,
  onSelect,
}: {
  selectedToken: tokenDetails;
  onSelect: (asset: tokenDetails) => void;
}) => {
  return (
    <select
      onChange={(e) => {
        const selectedToken = SUPPORTED_TOKENS.find(
          (x) => x.name === e.target.value
        );
        if (selectedToken) {
          onSelect(selectedToken);
        }
      }}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {SUPPORTED_TOKENS.map((token) => {
        return (
          <option
            key={token.name}
            value={token.name}
            selected={selectedToken.name == token.name}
          >
            {token.name}
          </option>
        );
      })}
    </select>
  );
};

function SwapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
      />
    </svg>
  );
}
