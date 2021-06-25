/* eslint-disable no-unused-expressions */
import { useRef, useCallback } from 'react';

const useDebounce = (callback: (...args: any[]) => void, wait = 0) => {
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args) => {
      ref.current && clearTimeout(ref.current);
      ref.current = setTimeout(() => callback(...args), wait);
    },
    [callback, wait],
  );
};

export default useDebounce;
