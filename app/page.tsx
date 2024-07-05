"use client";
import { useData } from "@/lib/dataStore";
import { useState, MouseEvent, useCallback, useEffect } from "react";
import {
  LongPressCallbackMeta,
  LongPressReactEvents,
  useLongPress,
} from "use-long-press";

export default function Home() {
  const data = useData();

  const [players, setPlayers] = useState<{
    [key: string]: { life: number; animations: number[]; bg: string };
  }>({
    "player-0": {
      life: 40,
      animations: [0, 0],
      bg: "bg-indigo-400",
    },
    "player-1": {
      life: 40,
      animations: [0, 0],
      bg: "bg-green-400",
    },
    "player-2": {
      life: 40,
      animations: [0, 0],
      bg: "bg-orange-400",
    },
    "player-3": {
      life: 40,
      animations: [0, 0],
      bg: "bg-yellow-400",
    },
  });

  useEffect(() => {
    window.oncontextmenu = function () {
      return false;
    };
  }, []);

  const callback = useCallback(
    (
      e: LongPressReactEvents<HTMLDivElement>,
      meta: LongPressCallbackMeta<[string, boolean]>
    ) => {
      const [player, isTopHalf] = meta.context!;
      const animations = (e.target as Element).getAnimations();

      let anims = [0, 0];

      if (animations.length > 0) {
        for (let i = 0; i < animations.length; i++) {
          animations[i].cancel();
          animations[i].play();
        }
      } else {
        anims = [isTopHalf ? 1 : 0, isTopHalf ? 0 : 1];
      }

      setPlayers((pls) => ({
        ...pls,
        [player]: {
          ...pls[player],
          animations: anims,
          life: players[player].life + (isTopHalf ? 10 : -10),
        },
      }));
    },
    [players]
  );

  const bind = useLongPress<HTMLDivElement, [string, boolean]>(callback, {
    threshold: 1000,
    cancelOnMovement: false,
  });

  const handleClick = (
    e: MouseEvent<HTMLDivElement>,
    player: string,
    isTopHalf: boolean
  ) => {
    let anims = [0, 0];

    const animations = e.currentTarget.getAnimations();

    if (animations.length > 0) {
      for (let i = 0; i < animations.length; i++) {
        animations[i].cancel();
        animations[i].play();
      }
    } else {
      anims = [isTopHalf ? 1 : 0, isTopHalf ? 0 : 1];
    }

    setPlayers((pls) => ({
      ...pls,
      [player]: {
        ...pls[player],
        life: pls[player].life + (isTopHalf ? 1 : -1),
        animations: anims,
      },
    }));
  };

  if (!data) {
    return null;
  }

  return (
    <main className="grid grid-cols-2 min-h-screen">
      {Object.keys(players).map((p) => {
        const { animations, life, bg } = players[p];
        return (
          <div
            key={p}
            className={`flex justify-center items-center w-full h-full ${bg} relative`}
          >
            <div
              className={`${
                animations[0] === 1 ? "animate-flash" : ""
              } absolute bg-transparent w-full h-1/2 top-0`}
              onClick={(e) => {
                handleClick(e, p, true);
              }}
              onAnimationEnd={() =>
                setPlayers((pls) => ({
                  ...pls,
                  [p]: {
                    ...pls[p],
                    animations: [0, 0],
                  },
                }))
              }
              {...bind([p, true])}
            />
            <div
              className={`${
                animations[1] === 1 ? "animate-flash" : ""
              } absolute bg-transparent w-full h-1/2 bottom-0`}
              onClick={(e) => {
                handleClick(e, p, false);
              }}
              onAnimationEnd={() =>
                setPlayers((pls) => ({
                  ...pls,
                  [p]: {
                    ...pls[p],
                    animations: [0, 0],
                  },
                }))
              }
              {...bind([p, false])}
            />
            <h1 className="text-white text-9xl select-none">{life}</h1>
          </div>
        );
      })}
    </main>
  );
}
