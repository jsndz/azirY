import { useState } from "react";
import { SUPPORTED_TOKENS, tokenDetails } from "../lib/tokens";

export const Swap = () => {
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
      ></SwapInputRow>
      <SwapInputRow
        selectedToken={quoteAsset}
        title="GET"
        onSelect={(asset) => {
          setQuoteAsset(asset);
        }}
      ></SwapInputRow>
    </div>
  );
};

export const SwapInputRow = ({
  onSelect,
  selectedToken,
  title,
}: {
  onSelect: (asset: tokenDetails) => void;
  selectedToken: tokenDetails;
  title: string;
}) => {
  return (
    <div>
      <p>{title}</p>
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
          <option key={token.name} value={selectedToken.name}>
            {token.name}
          </option>
        );
      })}
    </select>
  );
};
// filter((x) => x.name !== selectedToken.name).
