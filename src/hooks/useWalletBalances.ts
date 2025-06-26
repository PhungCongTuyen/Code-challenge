import { useState } from "react";

export const useWalletBalances = () => {
  const [balances, setBalances] = useState<any>([]);

  return balances;
};
