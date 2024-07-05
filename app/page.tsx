"use client";
import Dargo from "@/components/dargo";
import LotusMana from "@/components/lotusMana";
import ManaCounter from "@/components/manaCounter";
import ResetButton from "@/components/resetTurn";
import SacrificeCounter from "@/components/sacrificeCounter";
import { useData } from "@/lib/dataStore";
import { useState, MouseEvent, useCallback, useEffect } from "react";
import {
  LongPressCallbackMeta,
  LongPressReactEvents,
  useLongPress,
} from "use-long-press";

export default function Home() {
  const data = useData();

  useEffect(() => {
    window.oncontextmenu = function () {
      return false;
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <main className="fixed h-full w-full">
      <div className="grid grid-cols-2 h-full grid-rows-1">
        <div className="col-span-2">
          <Dargo />
        </div>
        <div className="col-span-2">
          <ManaCounter symbols={["b", "r", "g", "c"]} />
        </div>
        <SacrificeCounter />
        <LotusMana />
        <div className="col-span-2">
          <ResetButton />
        </div>
      </div>
    </main>
  );
}
