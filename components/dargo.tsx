"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  castDargo,
  incrementDargoLife,
  useData,
  incrementSacrifices,
  decrementSacrifices,
  undoCastDargo,
} from "@/lib/dataStore";

export default function Dargo() {
  const data = useData();
  const [manaCost, setManaCost] = useState(7); // Initial mana cost is 6R

  useEffect(() => {
    const calculateManaCost = () => {
      const baseCost = 6;
      const additionalCost = data?.dargo.castCount * 2 || 0;
      const sacrificeDiscount = (data?.sacrifices || 0) * 2;
      const totalCost = baseCost + additionalCost - sacrificeDiscount;

      setManaCost(totalCost);
    };

    calculateManaCost();
  }, [data?.dargo.castCount, data?.sacrifices]);

  const handleCastDargo = () => {
    castDargo();
  };

  const handleUndoCastDargo = () => {
    undoCastDargo();
  };

  const handleLifeChange = (delta: number) => {
    incrementDargoLife(delta);
  };

  return (
    <div
      className="w-full h-full bg-cover bg-center relative flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: "url('/images/dargo.jpg')" }}
    >
      <div className="bg-[rgb(0,0,0,0.3)] absolute top-0 w-full flex p-2 justify-end">
        <div className="text-4xl">{manaCost > 0 ? manaCost : ""}R</div>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-full h-1/2 absolute bg-transparent top-0 z-10"
          onClick={() => incrementDargoLife(1)}
        />
        <div
          className="w-full h-1/2 absolute bg-transparent bottom-0 z-10"
          onClick={() => incrementDargoLife(-1)}
        />
        <div className="text-9xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {data?.dargo.life}
        </div>
      </div>
      <div className="bg-[rgb(0,0,0,0.3)] absolute bottom-0 w-full flex flex-row items-center p-2">
        <div
          className="h-full w-1/2 absolute bg-transparent left-0 z-20"
          onClick={handleUndoCastDargo}
        />
        <div
          className="h-full w-1/2 absolute bg-transparent right-0 z-20"
          onClick={handleCastDargo}
        />
        <img src="icons/tax.png" alt="Commander tax" height={44} width={44} />
        <div className="text-4xl">: {data.dargo?.castCount * 2}</div>
      </div>
    </div>
  );
}
