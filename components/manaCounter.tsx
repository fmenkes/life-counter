"use client";

import { MouseEvent } from "react";
import { ManaColor } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import { decrementMana, incrementMana, useData } from "@/lib/dataStore";

interface ManaCounterProps {
  symbols: ManaColor[];
}

export default function ManaCounter({ symbols }: ManaCounterProps) {
  const data = useData();
  const [symbolsUsed, setSymbolsUsed] = useState(symbols);

  const handleClick = (
    e: MouseEvent<HTMLDivElement>,
    color: ManaColor,
    isTopHalf: boolean
  ) => {
    if (isTopHalf) {
      incrementMana(color);
    } else {
      decrementMana(color);
    }
  };

  return (
    <div className="w-full flex h-36">
      {symbolsUsed.map((symbol) => (
        <div
          key={symbol}
          className="w-full h-full flex items-center justify-center flex-col bg-gray-500 gap-2 relative"
        >
          <div
            className="w-full h-1/2 absolute bg-transparent top-0"
            onClick={(e) => handleClick(e, symbol, true)}
          />
          <div
            className="w-full h-1/2 absolute bg-transparent bottom-0"
            onClick={(e) => handleClick(e, symbol, false)}
          />
          <h1 className="text-5xl text-white">{data?.manaPool[symbol]}</h1>
          <Image
            src={`mana/${symbol}.svg`}
            alt={`${symbol} mana symbol`}
            width={36}
            height={36}
          />
        </div>
      ))}
    </div>
  );
}
