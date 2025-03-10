import { tokenDetails } from "@/lib/tokens";
import axios from "axios";
import { useEffect, useState } from "react";

export interface tokenwithBalance extends tokenDetails {
  balance: string;
  usdBalance: string;
}

export function useTokens(address: string) {
  const [tokenBalance, setTokenBalance] = useState<{
    totalBalance: number;
    tokens: tokenwithBalance[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`/api/token?Address=${address}`).then((res) => {
      setTokenBalance(res.data);
      setLoading(false);
    });
  }, []);
  return {
    loading,
    tokenBalance,
  };
}
