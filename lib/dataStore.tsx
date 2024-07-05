import { useState, useEffect } from "react";
import { ManaColor } from "./types";
import { EventEmitter } from "events";

interface Data {
  players: {
    [key: string]: { life: number; animations: number[]; bg: string };
  };
  manaPool: {
    w: number;
    u: number;
    b: number;
    r: number;
    g: number;
    c: number;
    lotus: number;
  };
  sacrifices: number;
  dargo: {
    life: number;
    castCount: number;
  };
  settings: {
    [key: string]: any;
  };
}

class DataStore extends EventEmitter {
  private data: Data;

  constructor() {
    super();
    this.data = {
      players: {
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
      },
      manaPool: {
        w: 0,
        u: 0,
        b: 0,
        r: 0,
        g: 0,
        c: 0,
        lotus: 0,
      },
      sacrifices: 0,
      dargo: {
        life: 40,
        castCount: 0,
      },
      settings: {},
    };
  }

  getData() {
    return this.data;
  }

  setData(data: Data) {
    this.data = data;
    this.emit("update", this.data);
  }

  modifyLifeTotal(player: string, lifeDelta: number) {
    this.data = {
      ...this.data,
      players: {
        ...this.data.players,
        [player]: {
          ...this.data.players[player],
          life: this.data.players[player].life + lifeDelta,
        },
      },
    };
    this.emit("update", this.data);
  }

  incrementMana(color: ManaColor) {
    this.data = {
      ...this.data,
      manaPool: {
        ...this.data.manaPool,
        [color]: this.data.manaPool[color] + 1,
      },
    };
    this.emit("update", this.data);
  }

  decrementMana(color: ManaColor) {
    if (this.data.manaPool[color] === 0) {
      return;
    }

    this.data = {
      ...this.data,
      manaPool: {
        ...this.data.manaPool,
        [color]: this.data.manaPool[color] - 1,
      },
    };
    this.emit("update", this.data);
  }

  incrementLotusMana() {
    this.data = {
      ...this.data,
      manaPool: {
        ...this.data.manaPool,
        lotus: this.data.manaPool.lotus + 1,
      },
    };
    this.emit("update", this.data);
  }

  decrementLotusMana() {
    if (this.data.manaPool.lotus === 0) {
      return;
    }

    this.data = {
      ...this.data,
      manaPool: {
        ...this.data.manaPool,
        lotus: this.data.manaPool.lotus - 1,
      },
    };
    this.emit("update", this.data);
  }

  incrementSacrifices() {
    this.data = {
      ...this.data,
      sacrifices: this.data.sacrifices + 1,
    };
    this.emit("update", this.data);
  }

  decrementSacrifices() {
    if (this.data.sacrifices === 0) {
      return;
    }

    this.data = {
      ...this.data,
      sacrifices: this.data.sacrifices - 1,
    };
    this.emit("update", this.data);
  }

  castDargo() {
    this.data = {
      ...this.data,
      dargo: {
        ...this.data.dargo,
        castCount: this.data.dargo.castCount + 1,
      },
    };
    this.emit("update", this.data);
  }

  undoCastDargo() {
    if (this.data.dargo.castCount > 0) {
      this.data = {
        ...this.data,
        dargo: {
          ...this.data.dargo,
          castCount: this.data.dargo.castCount - 1,
        },
      };
      this.emit("update", this.data);
    }
  }

  incrementDargoLife(delta: number) {
    this.data = {
      ...this.data,
      dargo: {
        ...this.data.dargo,
        life: this.data.dargo.life + delta,
      },
    };
    this.emit("update", this.data);
  }

  emptyManaPool() {
    this.data = {
      ...this.data,
      manaPool: {
        ...this.data.manaPool,
        w: 0,
        u: 0,
        b: 0,
        r: 0,
        g: 0,
        c: 0,
        lotus: 0,
      },
    };
    this.emit("update", this.data);
  }

  resetManaAndSacrifices() {
    this.data = {
      ...this.data,
      manaPool: {
        ...this.data.manaPool,
        w: 0,
        u: 0,
        b: 0,
        r: 0,
        g: 0,
        c: 0,
        lotus: 0,
      },
      sacrifices: 0,
    };
    this.emit("update", this.data);
  }
}

const store = new DataStore();

export function getDataStore() {
  return store;
}

export function getData() {
  return store.getData();
}

export function setData(data: Data) {
  store.setData(data);
}

export function incrementMana(color: ManaColor) {
  store.incrementMana(color);
}

export function decrementMana(color: ManaColor) {
  store.decrementMana(color);
}

export function incrementLotusMana() {
  store.incrementLotusMana();
}

export function decrementLotusMana() {
  store.decrementLotusMana();
}

export function incrementSacrifices() {
  store.incrementSacrifices();
}

export function decrementSacrifices() {
  store.decrementSacrifices();
}

export function castDargo() {
  store.castDargo();
}

export function undoCastDargo() {
  store.undoCastDargo();
}

export function incrementDargoLife(delta: number) {
  store.incrementDargoLife(delta);
}

export function emptyManaPool() {
  store.emptyManaPool();
}

export function resetManaAndSacrifices() {
  store.resetManaAndSacrifices();
}

export const useData = () => {
  const [data, setData] = useState<Data>(getData());

  useEffect(() => {
    const handleUpdate = (updatedData: Data) => {
      setData(updatedData);
    };

    store.on("update", handleUpdate);

    return () => {
      store.off("update", handleUpdate);
    };
  }, []);

  return data;
};
