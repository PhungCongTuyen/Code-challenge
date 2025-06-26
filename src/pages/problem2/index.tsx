import React, { useEffect, useMemo, useState } from "react";
import SwapCard, { Dropdown, SwapCardValue } from "../../components/SwapCard";
import icon from "../../assets/right-left-solid.svg";

const Problem2 = () => {
  const [fromState, setFromState] = useState<SwapCardValue>({
    amount: 0,
    currency: null,
    side: "From",
    walletBalance: null,
  });
  const [toState, setToState] = useState<SwapCardValue>({
    amount: 0,
    currency: null,
    side: "To",
  });
  const [dropdown, setDropdown] = useState<Dropdown[]>([]);

  const getData = async () => {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const newData = data.map((item, index) => ({
      ...item,
      currencyBalance: Math.random(),
    }));
    setDropdown(newData);
  };

  const fromDropdown = useMemo(() => {
    if (toState?.currency)
      return dropdown?.filter((x) => x?.currency !== toState?.currency);
    return dropdown;
  }, [toState?.currency, dropdown]);

  const toDropdown = useMemo(() => {
    if (fromState?.currency)
      return dropdown?.filter((x) => x?.currency !== fromState?.currency);
    return dropdown;
  }, [fromState?.currency, dropdown]);

  const onChangeFrom = (value: SwapCardValue) => {
    setFromState(value);
    if (value.amount === 0) {
      setToState((prev) => ({ ...prev, amount: 0 }));
    }
    if (toState.currency) {
      const fromAmount = value.amount;
      const fromCurrencyPrice = dropdown.find(
        (x) => x.currency === value.currency
      )?.price;
      const toCurrencyPrice = dropdown.find(
        (x) => x.currency === toState.currency
      )?.price;
      const toAmount = (fromCurrencyPrice * fromAmount) / toCurrencyPrice;
      const newState = { ...toState, amount: toAmount };
      setToState(newState);
    }
  };

  const onChangeTo = (value: SwapCardValue) => {
    if (value.currency) {
      const fromAmount = fromState.amount;
      const fromCurrencyPrice = dropdown.find(
        (x) => x.currency === fromState.currency
      )?.price;
      const toCurrencyPrice = dropdown.find(
        (x) => x.currency === value.currency
      )?.price;
      const toAmount = (fromCurrencyPrice * fromAmount) / toCurrencyPrice;
      const newState = { ...value, amount: toAmount };
      setToState(newState);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="relative">
        <SwapCard
          key="f"
          side="From"
          dropdown={fromDropdown}
          value={fromState}
          onChange={onChangeFrom}
        />
        <div className="w-fit bg-white p-2 rounded-full shadow-gray-400 shadow absolute left-[48%] top-[46%]">
          <img src={icon} alt="icon" className="w-3 rotate-90 " />
        </div>
        <SwapCard
          key="t"
          className="mt-2"
          side="To"
          value={toState}
          dropdown={toDropdown}
          onChange={onChangeTo}
        />
      </div>
      <button
        type="button"
        className="w-full cursor-pointer rounded bg-white p-2 shadow-gray-400 shadow mt-2 text-xs hover:bg-gray-200 transition-all"
      >
        Swap
      </button>
    </div>
  );
};

export default Problem2;
