"use client";

import { MouseEvent } from "react";
import Image from "next/image";
import {
  incrementLotusMana,
  decrementLotusMana,
  useData,
} from "@/lib/dataStore";

export default function LotusMana() {
  const data = useData();

  const handleClick = (isTopHalf: boolean) => {
    if (isTopHalf) {
      incrementLotusMana();
    } else {
      decrementLotusMana();
    }
  };

  return (
    <div
      className="w-full h-36 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/jeweled-lotus.jpg')" }}
    >
      <div className="w-full h-full flex items-center justify-center flex-col gap-2 relative">
        <div
          className="w-full h-1/2 absolute bg-transparent top-0 z-10"
          onClick={() => handleClick(true)}
        />
        <div
          className="w-full h-1/2 absolute bg-transparent bottom-0 z-10"
          onClick={() => handleClick(false)}
        />
        <h1 className="text-6xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {data?.manaPool.lotus}
        </h1>
      </div>
    </div>
  );
}
