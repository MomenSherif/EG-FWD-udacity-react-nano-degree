import { useEffect, useState } from 'react';

export default function useDebounceValue<TData>(
  value: TData,
  delay: number = 500,
): TData {
  const [debouncedValue, setDebouncedValue] = useState<TData>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
