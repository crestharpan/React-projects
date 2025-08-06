import { useState } from "react";
import { useEffect } from "react";

export function useLocalStorageState(intialState, key) {
  const [value, setValue] = useState(function () {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : intialState;
  });

  //STORING THE ITEMS IN THE LOCAL STORAGE
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
