import { useCallback, useState } from 'react';

export function useToggleState(initialState: boolean = false) {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, toggle, setState] as const;
}
