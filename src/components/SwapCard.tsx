import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { Input } from "../components/ui/input";

interface Props {
  className?: string;
  side?: "From" | "To";
  value: SwapCardValue;
  dropdown: Dropdown[];
  onChange?: (value?: any) => void;
}

export type SwapCardValue = {
  side?: "From" | "To";
  currency?: string;
  amount?: number;
  walletBalance?: number;
};

export type Dropdown = {
  currency: string;
  price: number;
  currencyBalance?: number;
};

const SwapCard: React.FC<Props> = (props) => {
  const { className, side, value, dropdown = [], onChange } = props;

  const [state, setState] = useState<SwapCardValue>(value);
  const onChangeSelect = (v: string) => {
    if (side === "From") {
      setState((prev) => ({
        ...prev,
        currency: v,
        walletBalance: dropdown.find((x: any) => x.currency === v)
          .currencyBalance,
        amount: 0,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        currency: v,
      }));
    }
  };

  const onClickMax = () => {
    setState({ ...value, amount: value.walletBalance });
  };

  const onChangeAmount = (v: string) => {
    setState({
      ...value,
      amount: Number(v) > value.walletBalance ? value.walletBalance : Number(v),
    });
  };

  useEffect(() => {
    setState(value);
  }, []);

  useEffect(() => {
    onChange(state);
  }, [state]);

  useEffect(() => {
    if (side === "To" && value.amount) {
      setState((prev) => ({ ...prev, amount: value.amount }));
    }
  }, [value.amount]);

  return (
    <div
      className={
        "box-border p-4 rounded shadow-gray-400 shadow w-full h-40 " + className
      }
    >
      <div className="flex justify-between text-sm text-gray-700">
        <p>{side}</p>
        {side === "From" && !!state.walletBalance && (
          <p>
            Available {state.walletBalance} {state.currency}
          </p>
        )}
      </div>
      <div className="flex justify-between">
        <Select onValueChange={onChangeSelect}>
          <SelectTrigger className="border-none shadow-none">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currency</SelectLabel>
              {dropdown.length &&
                dropdown?.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item.currency}>
                      {item.currency}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={value.amount}
          className="w-60 text-right shadow-none border-b border-gray-300 border-t-0 border-r-0 border-l-0 focus-visible:outline-0 focus-visible:ring-0"
          disabled={!state.currency || state.side === "To"}
          onChange={(event) => onChangeAmount(event.target.value)}
        />
      </div>
      {side === "From" && (
        <div className="flex justify-end text-sm">
          <button
            onClick={onClickMax}
            className="cursor-pointer font-semibold text-blue-500 hover:text-blue-700 transition-all p-2"
          >
            Max
          </button>
        </div>
      )}
    </div>
  );
};

export default SwapCard;
