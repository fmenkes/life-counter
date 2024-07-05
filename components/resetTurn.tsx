"use client";

import { emptyManaPool, resetManaAndSacrifices } from "@/lib/dataStore";
import { useState } from "react";

export default function ResetButton() {
  const [confirmEmpty, setConfirmEmpty] = useState(false);
  const [confirmNext, setConfirmNext] = useState(false);

  const handleClickEmpty = () => {
    if (confirmEmpty) {
      emptyManaPool();
      setConfirmEmpty(false);
    } else {
      setConfirmEmpty(true);
    }
  };

  const handleClickNext = () => {
    if (confirmNext) {
      resetManaAndSacrifices();
      setConfirmNext(false);
    } else {
      setConfirmNext(true);
    }
  };

  const handleClickCancel = () => {
    setConfirmNext(false);
    setConfirmEmpty(false);
  };

  const handleClickYes = () => {
    if (confirmNext) {
      handleClickNext();
    } else {
      handleClickEmpty();
    }
  };

  const handleClick = () => {
    resetManaAndSacrifices();
  };

  return (
    <div className="w-full h-12 flex">
      {confirmEmpty || confirmNext ? (
        <div className="bg-amber-600 text-white w-full flex items-center justify-between">
          <div className="ml-4">Are you sure?</div>
          <div className="flex w-1/2">
            <div
              className="bg-green-400 h-12 w-1/2 text-black flex items-center justify-center"
              onClick={handleClickCancel}
            >
              Cancel
            </div>
            <button
              className="bg-red-600 h-12 w-1/2 rounded flex items-center justify-center"
              onClick={handleClickYes}
            >
              Yes
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="w-1/2 h-full flex items-center justify-center bg-amber-600 text-white border-r-2"
            onClick={handleClickEmpty}
          >
            Empty pool
          </div>
          <div
            className="w-1/2 h-full flex items-center justify-center bg-amber-600 text-white"
            onClick={handleClickNext}
          >
            Next turn
          </div>
        </>
      )}
    </div>
  );
}
