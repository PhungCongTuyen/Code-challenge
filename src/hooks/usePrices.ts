import { useState } from "react";

export const usePrices = () => {
  const [prices, setPrices] = useState<any>({});
  return prices;
};
