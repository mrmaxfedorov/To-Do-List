import React, {useEffect, useState} from "react";

export const useLocalStorage = <TState>(key: string, newState: TState) => {
  const [state, setState] = useState<TState>(() => {
    const stateString = window.localStorage.getItem(key);
    return stateString ? (JSON.parse(stateString) as TState) : newState;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};