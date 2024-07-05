import React, { createContext, useContext, useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

type Player = {
  life: number;
  bg: string;
};

type Settings = {};

type Context = {
  players: Player[];
  settings: Settings;
  modifyLifeTotal: (player: number, lifeDelta: number) => void;
};

const PlayerContext = createContext<Context | null>(null);

export const PlayerContextProvider = ({ children }: Props) => {
  const [players, setPlayers] = useState<Player[]>([
    {
      life: 40,
      bg: "bg-indigo-400",
    },
    {
      life: 40,
      bg: "bg-green-400",
    },
    {
      life: 40,
      bg: "bg-orange-400",
    },
    {
      life: 40,
      bg: "bg-yellow-400",
    },
  ]);

  const [settings, setSettings] = useState({});

  const modifyLifeTotal = (player: number, delta: number) => {
    const newPlayers = [...players];
    newPlayers[player].life += delta;

    setPlayers(newPlayers);
  };

  return (
    <PlayerContext.Provider value={{ players, modifyLifeTotal, settings }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);

  if (!context)
    throw new Error(
      "PlayerContext must be called from within the PlayerContextProvider"
    );

  return context;
};
