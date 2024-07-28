import React, { useDebugValue } from "react";

export const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = React.useState<T>(value);
  const firstRender = React.useRef(new Date().getTime());
  useDebugValue(debounceValue);

  React.useEffect(() => {
    if (new Date().getTime() - firstRender.current < delay) return;

    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
};
